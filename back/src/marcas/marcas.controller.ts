import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaVehiculoDto, UpdateMarcaVehiculoDto } from './dto/marca-vehiculo.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Get()
  findAll() {
    return this.marcasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marcasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  create(@Body() dto: CreateMarcaVehiculoDto) {
    return this.marcasService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  update(@Param('id') id: number, @Body() dto: UpdateMarcaVehiculoDto) {
    return this.marcasService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  remove(@Param('id') id: number) {
    return this.marcasService.remove(id);
  }
}
