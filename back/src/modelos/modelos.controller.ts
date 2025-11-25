import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloVehiculoDto, UpdateModeloVehiculoDto } from './dto/modelo-vehiculo.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Get()
  findAll() {
    return this.modelosService.findAll();
  }

  @Get('marca/:marcaParam')
  findByMarca(@Param('marcaParam') marcaParam: string) {
    return this.modelosService.findByMarcaString(marcaParam);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modelosService.findOne(id);
  }

  @Post()
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  create(@Body() dto: CreateModeloVehiculoDto) {
    return this.modelosService.create(dto);
  }

  @Put(':id')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  update(@Param('id') id: number, @Body() dto: UpdateModeloVehiculoDto) {
    return this.modelosService.update(id, dto);
  }

  @Delete(':id')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  remove(@Param('id') id: number) {
    return this.modelosService.remove(id);
  }
}
