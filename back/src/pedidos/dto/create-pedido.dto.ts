import { CreatePedidoDetalleDto } from './create-pedido-detalle.dto';

export class CreatePedidoDto {
  id_cliente?: number;
  tipo_pedido: string; // online | local
  detalles: CreatePedidoDetalleDto[];
}
