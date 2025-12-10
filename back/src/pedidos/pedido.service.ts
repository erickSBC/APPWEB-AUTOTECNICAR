// src/pedidos/pedido.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago, Pedido, PedidoEstado } from '../entities/pedido.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Producto } from '../entities/producto.entity';
import { CarritosService } from 'src/carritos/carrito.service';
import { Carrito } from 'src/entities/carrito.entity';
import { ComprobantesService } from 'src/comprobantes/comprobante.service';
import { TipoComprobante } from 'src/entities/comprobante.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(Carrito)
    private readonly carritoRepo: Repository<Carrito>,
    private readonly carritoService: CarritosService,
    private readonly comprobantesService: ComprobantesService,
  ) { }

  private round2(value: number): number {
    return Math.round(value * 100) / 100;
  }

  async create(data: CreatePedidoDto) {
    // --- Validaciones de negocio existentes ---
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

    // Si es online y hay carrito, lo cierras (tu lógica actual)
    if (data.id_cliente != null) {
      const latestLog = await this.carritoRepo.findOne({
        where: {
          cliente: { id_cliente: data.id_cliente },
          estado: 'activo',
        } as any,
        order: { id_carrito: 'DESC' },
        select: { id_carrito: true },
      });

      if (latestLog) {
        await this.carritoService.remove(latestLog.id_carrito);
      }
    }

    const igvRate = 0.18;

    // Estado inicial (si no viene, pendiente)
    const estadoInicial = data.estado ?? PedidoEstado.enviado;

    // ---- 1) CREAR PEDIDO + DETALLES EN TRANSACCIÓN ----
    const pedidoCreado = await this.pedidoRepo.manager.transaction(
      async (manager) => {
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

          if (producto.stock < d.cantidad) {
            throw new BadRequestException(
              `Stock insuficiente para el producto ${producto.nombre ?? d.id_producto}`,
            );
          }

          const precio_unitario = Number(producto.precio);
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
            subtotal: this.round2(totalLineaConIGV),
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
          estado: estadoInicial,                    
          subtotal: this.round2(subtotalAcum),
          igv_total: this.round2(igvAcum),
          total: this.round2(totalAcum),
          metodo_pago: data.metodo_pago,
          detalles: detallesEntities,
          administradorVenta: data.id_admin_venta
            ? (data.id_admin_venta as any)
            : null,
        });

        const saved = await manager.save(Pedido, pedido);

        return manager.findOne(Pedido, {
          where: { id_pedido: saved.id_pedido },
          relations: ['cliente', 'detalles', 'detalles.producto', 'administradorVenta'],
        });
      },
    );

    // ---- 2) SI ESTÁ PAGADO → CREAR COMPROBANTE (BOLETA) ----
    if (pedidoCreado?.estado === PedidoEstado.pagado) {
      // Puedes generar la serie-correlativo como quieras. Ejemplo simple:
      const numeroBoleta = `EB01-${pedidoCreado.id_pedido
        .toString()
        .padStart(6, '0')}`;

      await this.comprobantesService.create({
        id_pedido: pedidoCreado.id_pedido,
        id_cliente: pedidoCreado.cliente?.id_cliente,
        tipo_comprobante: TipoComprobante.boleta,
        numero_comprobante: numeroBoleta,
        metodo_pago: pedidoCreado.metodo_pago ?? MetodoPago.tarjeta, // o lo que corresponda
      });
    }

    return pedidoCreado;
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

  const pedido = await this.findOne(id);

  // -erificar si ya existe un comprobante ---
  if (pedido.estado === PedidoEstado.pagado || pedido.estado === PedidoEstado.entregado) {
    const comprobanteExistente = await this.comprobantesService.findByPedidoId(pedido.id_pedido);

    if (!comprobanteExistente) {
      const numeroBoleta = `EB01-${pedido.id_pedido.toString().padStart(6, '0')}`;
      await this.comprobantesService.create({
        id_pedido: pedido.id_pedido,
        id_cliente: pedido.cliente?.id_cliente,
        tipo_comprobante: TipoComprobante.boleta,
        numero_comprobante: numeroBoleta,
        metodo_pago: pedido.metodo_pago ?? MetodoPago.tarjeta,
      });//
    }
    // Si ya existe,  no se crea otro
  }

  return pedido;
}
async findByCliente(id_cliente: number) {
    return this.pedidoRepo.find({
      where: { cliente: { id_cliente } } as any,
      relations: ['cliente', 'detalles', 'detalles.producto', 'administradorVenta'],
      order: { fecha_creacion: 'DESC' },
    });
  }
  async remove(id: number) {
    const result = await this.pedidoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return { deleted: true };
  }
}
