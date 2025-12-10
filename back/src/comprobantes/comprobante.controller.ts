import { Controller, Post, Get, Param, Body, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ComprobantesService } from './comprobante.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('comprobantes')

export class ComprobantesController {
  constructor(private readonly comprobantesService: ComprobantesService) { }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  create(@Body() data: CreateComprobanteDto) {
    return this.comprobantesService.create(data);
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  findAll() {
    return this.comprobantesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  findOne(@Param('id') id: number) {
    return this.comprobantesService.findOne(id);
  }
  @Get('pedido/:id_pedido')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  findByPedido(@Param('id_pedido', ParseIntPipe) id_pedido: number) {
    return this.comprobantesService.findByPedidoId(id_pedido);
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.comprobantesService.remove(id);
  }
}
