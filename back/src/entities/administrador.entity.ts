import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type RolAdministrador = 'superadmin' | 'vendedor';

@Entity('administrador')
export class Administrador {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id_admin: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'enum', enum: ['superadmin','vendedor'], default: 'vendedor' })
  rol: RolAdministrador;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
