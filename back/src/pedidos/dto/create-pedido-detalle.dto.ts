// src/pedidos/dto/create-pedido-detalle.dto.ts
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePedidoDetalleDto {
  @IsInt()
  @Type(() => Number)
  id_producto: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  cantidad: number;
}
