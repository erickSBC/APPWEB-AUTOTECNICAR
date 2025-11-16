export class CreateComprobanteDto {
  id_pedido: number;
  id_cliente?: number;
  tipo_comprobante: string;
  numero_comprobante: string;
  total: number;
  metodo_pago: string;
}
