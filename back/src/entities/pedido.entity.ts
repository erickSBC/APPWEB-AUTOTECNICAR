// src/entities/pedido.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { PedidoDetalle } from './pedido-detalle.entity';
import { Administrador } from './administrador.entity';

export enum PedidoEstado {
  pendiente = 'pendiente',
  pagado = 'pagado',
  procesando = 'procesando',
  enviado = 'enviado',
  entregado = 'entregado',
  cancelado = 'cancelado',
}

export enum TipoPedido {
  online = 'online',
  local = 'local',
}

export enum MetodoPago {
  tarjeta = 'tarjeta',
  yape = 'yape',
}

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Cliente, (c) => c.pedidos, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;

  @Column({ type: 'enum', enum: TipoPedido })
  tipo_pedido: TipoPedido; // "online" | "local"

  @Column({ type: 'varchar', length: 20, nullable: true })
  dni?: string;

  @Column({ type: 'enum', enum: PedidoEstado, default: PedidoEstado.pendiente })
  estado: PedidoEstado;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number; // sin IGV

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  igv_total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number; // con IGV

  @Column({ type: 'enum', enum: MetodoPago, nullable: true })
  metodo_pago?: MetodoPago;


  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido, { cascade: true })
  detalles: PedidoDetalle[];

  @ManyToOne(() => Administrador, { nullable: true })
  @JoinColumn({ name: 'id_admin_venta' })
  administradorVenta?: Administrador;

  @RelationId((pedido: Pedido) => pedido.administradorVenta)
  id_admin_venta?: number;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
