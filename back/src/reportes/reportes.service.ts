import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportesService {
  constructor(private readonly dataSource: DataSource) {}

  // ventas totales entre fechas
  async ventasTotales(desde?: string, hasta?: string) {
    let sql = `SELECT SUM(p.total) as total_ventas FROM pedido p WHERE estado='pagado'`;

    const params: any[] = [];

    if (desde) {
      sql += ` AND p.fecha_creacion >= ?`;
      params.push(desde);
    }
    if (hasta) {
      sql += ` AND p.fecha_creacion <= ?`;
      // IMPORTANTE: Agregamos la hora final para incluir todo el día
      params.push(hasta + ' 23:59:59'); 
    }

    // USAR query DIRECTAMENTE
    const res = await this.dataSource.query(sql, params);
    
    // query() siempre devuelve un array, tomamos el primer elemento
    return { total: Number(res[0]?.total_ventas ?? 0) };
  }

  // ventas por producto
  async ventasPorProducto(desde?: string, hasta?: string) {
    let sql = `SELECT pd.id_producto, pr.nombre, SUM(pd.cantidad) as cantidad_vendida, SUM(pd.subtotal) as ventas
      FROM pedido_detalle pd
      JOIN producto pr ON pr.id_producto = pd.id_producto
      JOIN pedido p ON p.id_pedido = pd.id_pedido
      WHERE p.estado = 'pagado'`; // 1=1 facilita concatenar ANDs después
    
    const params: any[] = [];
    
    if (desde) { sql += ` AND p.fecha_creacion >= ?`; params.push(desde); }
    if (hasta) { sql += ` AND p.fecha_creacion <= ?`; params.push(hasta + ' 23:59:59'); }
    
    sql += ` GROUP BY pd.id_producto, pr.nombre ORDER BY ventas DESC`;

    const res = await this.dataSource.query(sql, params);
    return res;
  }

  // pedidos por dia
  async pedidosPorDia(desde?: string, hasta?: string) {
    let sql = `SELECT DATE(p.fecha_creacion) as fecha, COUNT(*) as cantidad_pedidos, SUM(p.total) as total
      FROM pedido p WHERE p.estado = 'pagado'`;
      
    const params: any[] = [];
    
    if (desde) { sql += ` AND p.fecha_creacion >= ?`; params.push(desde); }
    if (hasta) { sql += ` AND p.fecha_creacion <= ?`; params.push(hasta + ' 23:59:59'); }
    
    sql += ` GROUP BY DATE(p.fecha_creacion) ORDER BY fecha`;

    const res = await this.dataSource.query(sql, params);
    return res;
  }

  // clientes top por compras
  async clientesTop(limit = 10) {
  const sql = `
    SELECT c.id_cliente,
           c.nombre,
           c.apellido,
           c.correo,
           SUM(p.total) as total_gastado,
           COUNT(p.id_pedido) as pedidos
    FROM cliente c
    JOIN pedido p ON p.id_cliente = c.id_cliente
    WHERE p.estado = 'pagado'
    GROUP BY c.id_cliente, c.nombre, c.apellido, c.correo
    ORDER BY total_gastado DESC
    LIMIT ?
  `;
  const res = await this.dataSource.query(sql, [limit]);
  return res;
}


  // productos con stock bajo
  async stockBajo(threshold = 5) {
const sql = `SELECT id_producto, nombre, stock
             FROM producto
             WHERE stock <= ?
             ORDER BY stock ASC`;
    const res = await this.dataSource.query(sql, [threshold]);
    return res;
  }
}