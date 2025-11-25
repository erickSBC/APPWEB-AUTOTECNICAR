import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ProductoModelo } from './producto-modelo.entity';

@Entity('modelo_vehiculo')
export class ModeloVehiculo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_modelo: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  marca: string;

  @OneToMany(() => ProductoModelo, (pm) => pm.modelo)
  productoModelos: ProductoModelo[];

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
