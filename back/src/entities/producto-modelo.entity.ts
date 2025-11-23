import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { ModeloVehiculo } from './modelo-vehiculo.entity';

@Entity('producto_modelo')
export class ProductoModelo {
  @PrimaryColumn({ type: 'bigint' })
  id_producto: number;

  @PrimaryColumn({ type: 'bigint' })
  id_modelo: number;

  @ManyToOne(() => Producto, (p) => p.productoModelos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @ManyToOne(() => ModeloVehiculo, (m) => m.productoModelos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_modelo' })
  modelo: ModeloVehiculo;
}
