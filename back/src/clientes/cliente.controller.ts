// src/Clientes/Clientes.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  findAll() {
    return this.clientesService.findAll();
  }


  @Get('buscar')
  @UseGuards(JwtGuard, RolesGuard)
  async searchByName(@Query('nombre') pattern: string) {
    if (typeof pattern !== 'string' || pattern.trim().length === 0) {
      throw new BadRequestException('Query param "nombre" is required and must be a non-empty string');
    }
    const results = await this.clientesService.searchByName(pattern.trim());
    return results;
  }
  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin','cliente')
  create(@Body() data: CreateClienteDto) {
    return this.clientesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin','cliente')
  update(@Param('id') id: number, @Body() data: any) {
    return this.clientesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
