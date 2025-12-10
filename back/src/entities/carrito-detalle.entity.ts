import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Carrito } from "./carrito.entity";
import { Producto } from "./producto.entity";

@Entity('carrito_detalle')
export class CarritoDetalle {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carrito' })
  carrito: Carrito;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}
