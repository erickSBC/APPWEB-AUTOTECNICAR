import { TipoComprobante } from "src/entities/comprobante.entity";
import { MetodoPago } from "src/entities/pedido.entity";

export class CreateComprobanteDto {
  id_pedido: number;
  id_cliente?: number;
  dni?: string;                        // opcional: sin cliente registrado (si venta local)
  tipo_comprobante: TipoComprobante;
  numero_comprobante: string;
  metodo_pago: MetodoPago;
}
