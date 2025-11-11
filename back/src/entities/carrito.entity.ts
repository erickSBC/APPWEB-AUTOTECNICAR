import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { CarritoDetalle } from "./carrito-detalle.entity";

// carrito.entity.ts
@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn()
  id_carrito: number;

  @ManyToOne(() => Cliente, (u) => u.carritos   )
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @Column({ default: 'activo' })
  estado: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @OneToMany(() => CarritoDetalle, (cd) => cd.carrito, { cascade: true })
  detalles: CarritoDetalle[];
}
