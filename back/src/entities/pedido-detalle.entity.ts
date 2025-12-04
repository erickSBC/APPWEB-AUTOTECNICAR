// src/pedidos/pedido-detalle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from '../entities/producto.entity';

@Entity('pedido_detalle')
export class PedidoDetalle {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Producto, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}
