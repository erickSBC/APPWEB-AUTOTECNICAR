import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { AdministradoresService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  create(@Body() data: CreateAdministradorDto) {
    return this.administradoresService.create(data);
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.administradoresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateAdministradorDto) {
    return this.administradoresService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.administradoresService.remove(id);
  }
}
