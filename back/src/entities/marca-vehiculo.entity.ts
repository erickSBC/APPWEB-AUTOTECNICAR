import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ModeloVehiculo } from './modelo-vehiculo.entity';

@Entity('marca_vehiculo')
export class MarcaVehiculo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_marca: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @OneToMany(() => ModeloVehiculo, (modelo) => modelo.marca)
  modelos: ModeloVehiculo[];

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
