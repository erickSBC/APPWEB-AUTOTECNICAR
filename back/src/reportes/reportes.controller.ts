import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';

@Controller('reportes')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ventas/totales')
  ventasTotales(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.ventasTotales(desde, hasta);
  }

  @Get('ventas/por-producto')
  ventasPorProducto(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.ventasPorProducto(desde, hasta);
  }

  @Get('pedidos/por-dia')
  pedidosPorDia(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.pedidosPorDia(desde, hasta);
  }

  @Get('clientes/top')
  clientesTop(@Query('limit') limit?: number) {
    return this.reportesService.clientesTop(Number(limit) || 10);
  }

  @Get('stock/bajo')
  stockBajo(@Query('threshold') threshold?: number) {
    return this.reportesService.stockBajo(Number(threshold) || 5);
  }
}
