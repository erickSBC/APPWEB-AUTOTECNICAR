import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, Query } from '@nestjs/common';
import { CarritosService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { CreateUpdateCarritoDetalleDto } from './dto/createupdate-carrito-detalle.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

@Controller('carrito')
export class CarritosController {
    constructor(private readonly carritosService: CarritosService) { }

    @Post()
    create(@Body() data: CreateCarritoDto) {
        return this.carritosService.create(data);
    }

    @Get()
    findAll() {
        return this.carritosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.carritosService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: UpdateCarritoDto) {
        return this.carritosService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.carritosService.remove(id);
    }

    // detalles
    @Post(':id/detalles')
    async addDetalle(@Param('id') id: number,
        @Body() dto: CreateUpdateCarritoDetalleDto,
        @Query('idCliente') idcliente: number,
    ) {
        let carritoId: number = id;
        if (idcliente !== undefined) {
            const nuevoCarrito = await this.carritosService.create({ id_cliente: idcliente });
            carritoId = nuevoCarrito.id_carrito;
            console.log("creandoidcarrito: ", carritoId)

        }
        return this.carritosService.addDetalle(carritoId, dto);
    }
    @Put(':id/detalles')
    updateDetalle(@Param('id') id: number, @Body() data: CreateUpdateCarritoDetalleDto) {
        return this.carritosService.updateDetalle(id, data);
    }
    @Get(':id/detalles')
    listDetalles(@Param('id') id: number) {
        return this.carritosService.listDetalles(id);
    }

    @Delete('detalles/:id_detalle')
    @HttpCode(204)
    removeDetalle(@Param('id_detalle') id_detalle: number) {
        return this.carritosService.removeDetalle(id_detalle);
    }
}
