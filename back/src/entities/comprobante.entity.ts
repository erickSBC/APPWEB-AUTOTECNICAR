// src/comprobantes/comprobante.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Pedido, MetodoPago } from '../entities/pedido.entity';
import { Cliente } from '../entities/cliente.entity';

export enum TipoComprobante {
  boleta = 'boleta',
  factura = 'factura',
}

@Entity('comprobante')
export class Comprobante {
  @PrimaryGeneratedColumn()
  id_comprobante: number;

  // 1 comprobante ↔ 1 pedido (relación uno a uno)
  @OneToOne(() => Pedido, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  // Cliente registrado (opcional)
  @ManyToOne(() => Cliente, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;

  // DNI directo (ventas locales sin cliente registrado)
  @Column({ type: 'varchar', length: 20, nullable: true })
  dni?: string;

  @Column({ type: 'enum', enum: TipoComprobante })
  tipo_comprobante: TipoComprobante;

  @Column({ type: 'varchar', length: 50, unique: true })
  numero_comprobante: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  // Método de pago: usamos el mismo enum del Pedido
  @Column({ type: 'enum', enum: MetodoPago, nullable: true })
  metodo_pago?: MetodoPago;

  @CreateDateColumn()
  fecha_emision: Date;
}
