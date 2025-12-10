// src/categorias/categorias.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categoria.service';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  create(@Body() data: any) {
    return this.categoriasService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: number, @Body() data: any) {
    return this.categoriasService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }
}
