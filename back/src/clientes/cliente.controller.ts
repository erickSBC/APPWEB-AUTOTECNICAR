// src/Clientes/Clientes.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { CreateClienteDto } from './create-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Get()
  findAll() {

    return this.clientesService.findAll();
  }


  @Get('buscar')
  async searchByName(@Query('nombre') pattern: string) {
    if (typeof pattern !== 'string' || pattern.trim().length === 0) {
      throw new BadRequestException('Query param "nombre" is required and must be a non-empty string');
    }
    const results = await this.clientesService.searchByName(pattern.trim());
    return results;
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }
  @Post()
  create(@Body() data: CreateClienteDto) {
    return this.clientesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.clientesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
