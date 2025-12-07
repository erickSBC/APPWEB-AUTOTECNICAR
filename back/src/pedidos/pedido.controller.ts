import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() data: CreatePedidoDto) {
    return this.pedidosService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(id);
  }
   // 🔹 NUEVO: obtener comprobante por id_pedido
   @Get('cliente/:id_cliente')
  findByCliente(
    @Param('id_cliente', ParseIntPipe) id_cliente: number,
  ) {
    return this.pedidosService.findByCliente(id_cliente);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdatePedidoDto) {
    return this.pedidosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pedidosService.remove(id);
  }
}
