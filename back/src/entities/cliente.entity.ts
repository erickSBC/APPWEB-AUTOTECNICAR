import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Carrito } from './carrito.entity';


@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_cliente: number;

  @Column({ type: 'varchar', length: 100 ,nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 100 ,nullable: true })
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true})
  telefono: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  @OneToMany(() => Carrito, (c) => c.cliente)
  carritos: Carrito[];
}
