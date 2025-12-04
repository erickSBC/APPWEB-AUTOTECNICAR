  // src/pedidos/dto/update-pedido.dto.ts
  import { IsEnum, IsOptional, IsString } from 'class-validator';
  import { PedidoEstado } from '../../entities/pedido.entity';

  export class UpdatePedidoDto {
    @IsOptional()
    @IsEnum(PedidoEstado)
    estado?: PedidoEstado;

    @IsOptional()
    @IsString()
    codigo_transaccion?: string;
  }
