import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { CreatePedidoDetalleDto } from './dto/create-pedido-detalle.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Producto } from '../entities/producto.entity';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoDetalle)
    private readonly detalleRepo: Repository<PedidoDetalle>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(data: CreatePedidoDto) {
    // calcular subtotal y total
  let total = 0;
  const detalles: any[] = [];
    for (const d of data.detalles) {
      const producto = await this.productoRepo.findOne({ where: { id_producto: d.id_producto } as any });
      if (!producto) throw new NotFoundException('Producto not found: ' + d.id_producto);
      const subtotal = Number(d.cantidad) * Number(d.precio_unitario);
      total += subtotal;
      const detalleEntity = this.detalleRepo.create({
        producto: { id_producto: d.id_producto } as any,
        cantidad: d.cantidad,
        precio_unitario: d.precio_unitario,
        subtotal,
      } as any);
      detalles.push(detalleEntity);
    }

    const pedido = this.pedidoRepo.create({
      cliente: data.id_cliente ? ({ id_cliente: data.id_cliente } as any) : undefined,
      tipo_pedido: data.tipo_pedido,
      total,
      detalles,
    } as any);

    return this.pedidoRepo.save(pedido);
  }

  async findAll() {
    return this.pedidoRepo.find({ relations: ['cliente', 'detalles', 'detalles.producto'] });
  }

  async findOne(id: number) {
    const p = await this.pedidoRepo.findOne({ where: { id_pedido: id }, relations: ['cliente', 'detalles', 'detalles.producto'] });
    if (!p) throw new NotFoundException('Pedido not found');
    return p;
  }

  async update(id: number, data: UpdatePedidoDto) {
    await this.pedidoRepo.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.pedidoRepo.delete(id);
    return { deleted: true };
  }
}
