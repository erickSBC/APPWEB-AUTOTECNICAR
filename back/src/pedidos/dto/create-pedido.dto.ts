// src/pedidos/dto/create-pedido.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { CreatePedidoDetalleDto } from './create-pedido-detalle.dto';
import { MetodoPago, PedidoEstado, TipoPedido } from '../../entities/pedido.entity';

export class CreatePedidoDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_cliente?: number;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsEnum(TipoPedido)
  tipo_pedido: TipoPedido; // 'online' | 'local'

  @IsOptional()
  @IsEnum(MetodoPago)
  metodo_pago?: MetodoPago; // tarjeta | yape | ...

 
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id_admin_venta?: number;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoDetalleDto)
  @ArrayMinSize(1)
  detalles: CreatePedidoDetalleDto[];

   @IsOptional()
  @IsEnum(PedidoEstado)
  estado?: PedidoEstado; 
}
