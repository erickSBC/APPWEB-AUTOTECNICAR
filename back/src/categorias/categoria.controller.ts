// src/categorias/categorias.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriasService } from './categoria.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.categoriasService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.categoriasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }
}
