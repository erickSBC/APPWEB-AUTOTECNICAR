// src/pedidos/pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';
import { Administrador } from './administrador.entity';

export enum PedidoEstado {
  pendiente = 'pendiente',
  pagado = 'pagado',
  procesando = 'enviado',
  entregado = 'entregado',
  cancelado = 'cancelado',
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
  @Column({ type: 'varchar', length: 20 })
  dni?: string; 
  @Column({ type: 'enum', enum: PedidoEstado, default: PedidoEstado.pendiente })
  estado: PedidoEstado;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido, { cascade: true })
  detalles: PedidoDetalle[];
@ManyToOne(() => Administrador, { nullable: true })
  @JoinColumn({ name: 'id_admin_venta' })
  administradorVenta?: Administrador;

  // ✅ FK expuesta para consultas rápidas o DTOs (Opcional, pero recomendado)
  @RelationId((pedido: Pedido) => pedido.administradorVenta)
  id_admin_venta?: number;
  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
