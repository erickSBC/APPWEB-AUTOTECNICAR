import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { MarcaVehiculo } from './marca-vehiculo.entity';
import { ProductoModelo } from './producto-modelo.entity';

@Entity('modelo_vehiculo')
export class ModeloVehiculo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_modelo: number;

  @ManyToOne(() => MarcaVehiculo, (marca) => marca.modelos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_marca' })
  marca: MarcaVehiculo;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @OneToMany(() => ProductoModelo, (pm) => pm.modelo)
  productoModelos: ProductoModelo[];

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
