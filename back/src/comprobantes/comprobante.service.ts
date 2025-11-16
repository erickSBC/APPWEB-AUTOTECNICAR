import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprobante } from '../entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { Pedido } from '../entities/pedido.entity';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ComprobantesService {
  constructor(
    @InjectRepository(Comprobante)
    private readonly comprobanteRepo: Repository<Comprobante>,
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(data: CreateComprobanteDto) {
    const pedido = await this.pedidoRepo.findOne({ where: { id_pedido: data.id_pedido } as any });
    if (!pedido) throw new NotFoundException('Pedido not found');

    if (data.id_cliente) {
      const cliente = await this.clienteRepo.findOne({ where: { id_cliente: data.id_cliente } as any });
      if (!cliente) throw new NotFoundException('Cliente not found');
    }

    const comprobante = this.comprobanteRepo.create({
      pedido: { id_pedido: data.id_pedido } as any,
      cliente: data.id_cliente ? ({ id_cliente: data.id_cliente } as any) : undefined,
      tipo_comprobante: data.tipo_comprobante,
      numero_comprobante: data.numero_comprobante,
      total: pedido.total,
      metodo_pago: data.metodo_pago,
    } as any);

    return this.comprobanteRepo.save(comprobante);
  }

  async findAll() {
    return this.comprobanteRepo.find({ relations: ['pedido', 'cliente'] });
  }

  async findOne(id: number) {
    const c = await this.comprobanteRepo.findOne({ where: { id_comprobante: id }, relations: ['pedido', 'cliente'] });
    if (!c) throw new NotFoundException('Comprobante not found');
    return c;
  }

  async remove(id: number) {
    await this.comprobanteRepo.delete(id);
    return { deleted: true };
  }
}
