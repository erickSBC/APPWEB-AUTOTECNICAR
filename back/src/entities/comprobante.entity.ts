// src/comprobantes/comprobante.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Cliente } from '../entities/cliente.entity';

@Entity('comprobante')
export class Comprobante {
  @PrimaryGeneratedColumn()
  id_comprobante: number;

  @ManyToOne(() => Pedido, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Cliente, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;
  
  @Column({ type: 'varchar', length: 20 })
  tipo_comprobante: string; // boleta, factura, ticket

  @Column({ type: 'varchar', length: 50 })
  numero_comprobante: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 50 })
  metodo_pago: string; // efectivo, tarjeta, transferencia

  @CreateDateColumn()
  fecha_emision: Date;
}
