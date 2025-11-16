// src/pedidos/pedido.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente} from '../entities/cliente.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Cliente, (c) => c.pedidos, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente                                     ;

  @Column({ type: 'varchar', length: 20 })
  tipo_pedido: string; // "online" | "local"

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string; // pendiente | pagado | cancelado | entregado

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido, { cascade: true })
  detalles: PedidoDetalle[];

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
