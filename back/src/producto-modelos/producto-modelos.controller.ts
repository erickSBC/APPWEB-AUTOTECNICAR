import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductoModelosService } from './producto-modelos.service';
import { CreateProductoModeloDto, UpdateProductoModeloDto } from './dto/producto-modelo.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('producto-modelos')
export class ProductoModelosController {
  constructor(private readonly productoModelosService: ProductoModelosService) {}

  @Get()
  findAll() {
    return this.productoModelosService.findAll();
  }

  @Get('producto/:id_producto')
  findByProducto(@Param('id_producto') id_producto: number) {
    return this.productoModelosService.findByProducto(id_producto);
  }

  @Get('modelo/:id_modelo')
  findByModelo(@Param('id_modelo') id_modelo: number) {
    return this.productoModelosService.findByModelo(id_modelo);
  }

  @Get(':id_producto/:id_modelo')
  findOne(
    @Param('id_producto') id_producto: number,
    @Param('id_modelo') id_modelo: number,
  ) {
    return this.productoModelosService.findOne(id_producto, id_modelo);
  }

  @Post()
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  create(@Body() dto: CreateProductoModeloDto) {
    return this.productoModelosService.create(dto);
  }

  @Put(':id_producto/:id_modelo')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  update(
    @Param('id_producto') id_producto: number,
    @Param('id_modelo') id_modelo: number,
    @Body() dto: UpdateProductoModeloDto,
  ) {
    return this.productoModelosService.update(id_producto, id_modelo, dto);
  }

  @Delete(':id_producto/:id_modelo')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  remove(
    @Param('id_producto') id_producto: number,
    @Param('id_modelo') id_modelo: number,
  ) {
    return this.productoModelosService.remove(id_producto, id_modelo);
  }
}
