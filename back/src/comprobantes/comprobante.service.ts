import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprobante } from '../entities/comprobante.entity';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { Pedido, PedidoEstado } from '../entities/pedido.entity';
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

  // --- Crear comprobante a partir de un pedido ---
  async create(data: CreateComprobanteDto) {
    // 1) Buscar pedido con cliente
    const pedido = await this.pedidoRepo.findOne({
      where: { id_pedido: data.id_pedido } as any,
      relations: ['cliente'],
    });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado para comprobante');
    }

    // 2) se valida que el pedido esté 'pagado' o 'entregado' 
    if (pedido.estado !== PedidoEstado.pagado && pedido.estado !== PedidoEstado.entregado) {
      throw new BadRequestException(
        'Solo se puede generar comprobante para pedidos pagados o entregados ',
      );
    }

    // 3) Verificar que no exista ya un comprobante para este pedido
    const existente = await this.findByPedidoId(pedido.id_pedido);
    if (existente) {
      throw new BadRequestException(
        'Ya existe un comprobante para este pedido',
      );
    }

    // 4) Resolver cliente:
    //    - Si viene id_cliente en el DTO, se prioriza
    //    - Si no, se usa el cliente del pedido (si tiene)
    let cliente: Cliente | undefined | null = undefined;

    if (data.id_cliente) {
      cliente = await this.clienteRepo.findOne({
        where: { id_cliente: data.id_cliente } as any,
      });
      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado para comprobante');
      }
    } else if (pedido.cliente) {
      cliente = pedido.cliente;
    }

    // 5) Resolver DNI:
    //    - Si viene en el DTO, se usa ese
    //    - Si no, se copia el del pedido (para pedidos locales con solo DNI)
    const dni = data.dni ?? pedido.dni ?? null;

    // 6) Resolver método de pago:
    //    - Si viene en DTO, se usa ese
    //    - Si no, se copia del pedido
    const metodoPago = pedido.metodo_pago ?? null;

    // 7) Crear entidad comprobante copiando datos clave del pedido
    const comprobante = this.comprobanteRepo.create({
      pedido,                         // relación 1:1
      cliente: cliente ?? undefined,  
      dni: dni ?? undefined,
      tipo_comprobante: data.tipo_comprobante,
      numero_comprobante: data.numero_comprobante,
      total: pedido.total,            
      metodo_pago: metodoPago ?? undefined,
    });

    return this.comprobanteRepo.save(comprobante);
  }

  // --- Listar todos los comprobantes ---
  async findAll() {
    return this.comprobanteRepo.find({
      relations: ['pedido', 'cliente'],
      order: { fecha_emision: 'DESC' },
    });
  }

  // --- Buscar comprobante por ID ---
  async findOne(id: number) {
    const c = await this.comprobanteRepo.findOne({
      where: { id_comprobante: id },
      relations: ['pedido', 'cliente'],
    });
    if (!c) {
      throw new NotFoundException('Comprobante no encontrado');
    }
    return c;
  }

  // --- Borrar comprobante ---
  async remove(id: number) {
    const result = await this.comprobanteRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Comprobante no encontrado');
    }
    return { deleted: true };
  }

  // --- Buscar comprobante por id_pedido (para evitar duplicados, etc.) ---
  async findByPedidoId(id_pedido: number) {
     const comp = await this.comprobanteRepo.findOne({
      where: { pedido: { id_pedido } } as any,
      relations: ['pedido', 'pedido.detalles', 'pedido.detalles.producto', 'cliente'],
    });
    return comp;
  }
}
