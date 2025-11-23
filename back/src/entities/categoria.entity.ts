// src/categorias/entities/categoria.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Producto } from './producto.entity';
import { RelationId, ManyToOne } from 'typeorm';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_categoria: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  // Relación con productos
  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  // Relación padre/hijos (categoría jerárquica)
  @ManyToOne(() => Categoria, (categoria) => categoria.hijos, { nullable: true })
  padre?: Categoria;

  @OneToMany(() => Categoria, (categoria) => categoria.padre)
  hijos: Categoria[];

  // FK expuesta para consultas rápidas
  @RelationId((categoria: Categoria) => categoria.padre)
  id_padre?: number;
}
