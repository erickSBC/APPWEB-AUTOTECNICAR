// src/productos/productos.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { ProductosService } from './producto.service';
import { CreateProductoDto } from './create-producto.dto';
import { normalizePagination } from 'src/utils/pagination.util';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  create(@Body() data: CreateProductoDto) {
    return this.productosService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)

  @Roles('admin')
  update(@Param('id') id: number, @Body() data: any) {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)

  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }

}
