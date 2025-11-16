import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ComprobantesService } from './comprobante.service';
import { CreateComprobanteDto } from './dto/create-comprobante.dto';

@Controller('comprobantes')
export class ComprobantesController {
  constructor(private readonly comprobantesService: ComprobantesService) {}

  @Post()
  create(@Body() data: CreateComprobanteDto) {
    return this.comprobantesService.create(data);
  }

  @Get()
  findAll() {
    return this.comprobantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.comprobantesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.comprobantesService.remove(id);
  }
}
