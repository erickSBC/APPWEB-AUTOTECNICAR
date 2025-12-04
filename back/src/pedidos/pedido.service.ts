// src/pedidos/pedido.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, PedidoEstado } from '../entities/pedido.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Producto } from '../entities/producto.entity';
import { CarritosService } from 'src/carritos/carrito.service';
import { Carrito } from 'src/entities/carrito.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(Carrito)
    private readonly carritoRepo: Repository<Carrito>,
    private readonly carritoService: CarritosService
  ) { }

  private round2(value: number): number {
    return Math.round(value * 100) / 100;
  }

  async create(data: CreatePedidoDto /* , userAdminId?: number */) {
    // Regla simple de negocio
    if (data.tipo_pedido === 'online' && !data.id_cliente) {
      throw new BadRequestException(
        'Para un pedido online es obligatorio id_cliente',
      );
    }

    if (data.tipo_pedido === 'local' && !data.dni && !data.id_cliente) {
      throw new BadRequestException(
        'Para un pedido local necesitas al menos DNI o id_cliente',
      );
    }
    if (data.id_cliente != null) {
      const latestLog = await this.carritoRepo.findOne({
        // 1. Condición: Buscar por el ID del usuario
        where: {
          cliente: { id_cliente: data.id_cliente },
          estado: "activo"
        },

        // 2. Ordenar: Ordenar por ID descendente para obtener el más reciente
        order: { id_carrito: 'DESC' },

        // 3. Selección: Especificar solo los campos a cargar
        select: {
          id_carrito: true,
        },
      });
      await this.carritoService.remove(latestLog?.id_carrito!);
    }
    const igvRate = 0.18;

    return this.pedidoRepo.manager.transaction(async (manager) => {
      let subtotalAcum = 0;
      let igvAcum = 0;
      let totalAcum = 0;

      const detallesEntities: PedidoDetalle[] = [];

      for (const d of data.detalles) {
        const producto = await manager.findOne(Producto, {
          where: { id_producto: d.id_producto } as any,
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto no encontrado: ${d.id_producto}`,
          );
        }

        // Verificar stock
        if (producto.stock < d.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para el producto ${producto.nombre ?? d.id_producto}`,
          );
        }

        // Tomar precio desde BD (NO desde el cliente)
        const precio_unitario = Number(
          (producto as any).precio ?? (producto as any).precio,
        );
        if (isNaN(precio_unitario)) {
          throw new BadRequestException(
            `Producto ${d.id_producto} no tiene precio configurado`,
          );
        }

        const totalLineaConIGV = d.cantidad * precio_unitario;
        const valorSinIGV = this.round2(totalLineaConIGV / (1 + igvRate));
        const igvLinea = this.round2(totalLineaConIGV - valorSinIGV);

        subtotalAcum += valorSinIGV;
        igvAcum += igvLinea;
        totalAcum += totalLineaConIGV;

        const detalle = manager.create(PedidoDetalle, {
          producto,
          cantidad: d.cantidad,
          precio_unitario,
          subtotal: this.round2(totalLineaConIGV), // guardo con IGV
        });

        detallesEntities.push(detalle);

        // Descontar stock
        producto.stock -= d.cantidad;
        await manager.save(Producto, producto);
      }

      const pedido = manager.create(Pedido, {
        cliente: data.id_cliente
          ? ({ id_cliente: data.id_cliente } as any)
          : null,
        dni: data.dni ?? '',
        tipo_pedido: data.tipo_pedido,
        estado: PedidoEstado.pendiente,
        subtotal: this.round2(subtotalAcum),
        igv_total: this.round2(igvAcum),
        total: this.round2(totalAcum),
        metodo_pago: data.metodo_pago,
        detalles: detallesEntities,
        administradorVenta: data.id_admin_venta ? (data.id_admin_venta  as any) : null,
      });
      const saved = await manager.save(Pedido, pedido);




      return manager.findOne(Pedido, {
        where: { id_pedido: saved.id_pedido },
        relations: ['cliente', 'detalles', 'detalles.producto', 'administradorVenta'],
      });
    });

  }

  async findAll() {
    return this.pedidoRepo.find({
      relations: ['cliente', 'detalles', 'detalles.producto', 'administradorVenta'],
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const p = await this.pedidoRepo.findOne({
      where: { id_pedido: id },
      relations: ['cliente', 'detalles', 'detalles.producto', 'administradorVenta'],
    });
    if (!p) throw new NotFoundException('Pedido no encontrado');
    return p;
  }

  async update(id: number, data: UpdatePedidoDto) {
    const exists = await this.pedidoRepo.findOne({ where: { id_pedido: id } });
    if (!exists) throw new NotFoundException('Pedido no encontrado');

    await this.pedidoRepo.update(id, {
      estado: data.estado ?? exists.estado,
    } as any);

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.pedidoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return { deleted: true };
  }
}
