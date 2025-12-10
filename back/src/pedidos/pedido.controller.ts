import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  create(@Body() data: CreatePedidoDto) {
    return this.pedidosService.create(data);
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(id);
  }
  @Get('cliente/:id_cliente')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'cliente')
  findByCliente(
    @Param('id_cliente', ParseIntPipe) id_cliente: number,
  ) {
    return this.pedidosService.findByCliente(id_cliente);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: UpdatePedidoDto) {
    return this.pedidosService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.pedidosService.remove(id);
  }
}
