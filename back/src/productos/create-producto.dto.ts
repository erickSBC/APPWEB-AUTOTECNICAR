// src/productos/dto/create-producto.dto.ts
export class CreateProductoDto {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  descuento?: number;
  activo?: number;
  imagen?: string;
  id_categoria: number;
}
