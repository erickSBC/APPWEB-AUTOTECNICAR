// src/pedidos/pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';

export enum PedidoEstado {
  pendiente = 'pendiente',
  pagado = 'pagado',
  procesando = 'procesando',
  enviado = 'enviado',
  entregado = 'entregado',
  cancelado = 'cancelado',
  reembolso = 'reembolso',
}

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Cliente, (c) => c.pedidos, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;

  @Column({ type: 'varchar', length: 20 })
  tipo_pedido: string; // "online" | "local"

  @Column({ type: 'enum', enum: PedidoEstado, default: PedidoEstado.pendiente })
  estado: PedidoEstado;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido, { cascade: true })
  detalles: PedidoDetalle[];

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
