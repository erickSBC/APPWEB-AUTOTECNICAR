import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ventas/totales')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  ventasTotales(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.ventasTotales(desde, hasta);
  }

  @Get('ventas/por-producto')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  ventasPorProducto(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.ventasPorProducto(desde, hasta);
  }

  @Get('pedidos/por-dia')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  pedidosPorDia(@Query('desde') desde?: string, @Query('hasta') hasta?: string) {
    return this.reportesService.pedidosPorDia(desde, hasta);
  }

  @Get('clientes/top')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  clientesTop(@Query('limit') limit?: number) {
    return this.reportesService.clientesTop(Number(limit) || 10);
  }

  @Get('stock/bajo')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  stockBajo(@Query('threshold') threshold?: number) {
    return this.reportesService.stockBajo(Number(threshold) || 5);
  }
}
