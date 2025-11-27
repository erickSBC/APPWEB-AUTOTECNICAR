// src/productos/productos.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { ProductosService } from './producto.service';
import { CreateProductoDto } from './create-producto.dto';
import { normalizePagination } from 'src/utils/pagination.util';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Get()
  findAll(@Query() query: any) {
    const { skip, take } = normalizePagination(query);
    return this.productosService.findAllPaginated(skip, take);
  }


  @Get('buscar')
  async searchByName(@Query('nombre') pattern: string) {
    if (typeof pattern !== 'string' || pattern.trim().length === 0) {
      throw new BadRequestException('Query param "nombre" is required and must be a non-empty string');
    }
    const results = await this.productosService.searchByName(pattern.trim());
    return results;
  }
  @Get('filtrar')
  async filterProducts(
    @Query('nombre') nombre?: string,
    @Query('categorias') categorias?: string,
    @Query() query?: any
  ) {
    const { skip, take } = normalizePagination(query);

    // convertir "1,3,5" → [1, 3, 5]
    const categoriasArray = categorias
      ? categorias.split(',').map(id => Number(id))
      : [];

    return this.productosService.filterProducts({
      nombre,
      categorias: categoriasArray,
      skip,
      take,
    });
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }
  @Post()
  create(@Body() data: CreateProductoDto) {
    return this.productosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }

}
