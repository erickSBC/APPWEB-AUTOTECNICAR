import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { AdministradoresService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administrador')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  create(@Body() data: CreateAdministradorDto) {
    return this.administradoresService.create(data);
  }

  @Get()
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get(':id')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin','vendedor']))
  findOne(@Param('id') id: number) {
    return this.administradoresService.findOne(id);
  }
@Get('buscar')
  async searchByName(@Query('nombre') pattern: string) {
    if (typeof pattern !== 'string' || pattern.trim().length === 0) {
      throw new BadRequestException('Query param "nombre" is required and must be a non-empty string');
    }
    const results = await this.administradoresService.searchByName(pattern.trim());
    return results;
  }
  @Put(':id')
  ////@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  update(@Param('id') id: number, @Body() data: UpdateAdministradorDto) {
    return this.administradoresService.update(id, data);
  }

  @Delete(':id')
  //@UseGuards(JwtGuard, new RolesGuard(['superadmin']))
  remove(@Param('id') id: number) {
    return this.administradoresService.remove(id);
  }
}
