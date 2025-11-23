// src/productos/entities/producto.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { ProductoModelo } from './producto-modelo.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_producto: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', width: 11 })
  stock: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  activo: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  @OneToMany(() => ProductoModelo, (pm) => pm.producto)
  productoModelos: ProductoModelo[];
}
