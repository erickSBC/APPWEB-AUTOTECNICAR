import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, ParseIntPipe } from '@nestjs/common';
import { CarritosService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { CreateUpdateCarritoDetalleDto } from './dto/createupdate-carrito-detalle.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

@Controller('carrito')
export class CarritosController {
    constructor(private readonly carritosService: CarritosService) { }

    // --- Gestión de Carritos (Base) ---

    @Post()
    create(@Body() data: CreateCarritoDto) {
        // Crea un nuevo carrito.
        return this.carritosService.create(data);
    }

    @Get()
    findAll() {
        // Lista todos los carritos.
        return this.carritosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        // Obtiene un carrito por su ID.
        return this.carritosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateCarritoDto
    ) {
        // Actualiza el estado u otra data del carrito.
        return this.carritosService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        // Elimina un carrito.
        return this.carritosService.remove(id);
    }

    // --- Gestión de Detalles de Carrito ---

    @Post(':id/detalles')
    async addDetalle(
        @Param('id', ParseIntPipe) id: number, // ID del Carrito que DEBE existir
        @Body() dto: CreateUpdateCarritoDetalleDto,
    ) {
        // Agrega un producto al carrito existente.
        // El servicio obtendrá el precio unitario del producto.
        return this.carritosService.addDetalle(id, dto);
    }

    @Get(':id/detalles')
    listDetalles(@Param('id', ParseIntPipe) id: number) {
        // Lista todos los productos en un carrito.
        return this.carritosService.listDetalles(id);
    }

    // **MODIFICADO:** Ahora la ruta es clara para actualizar un ítem específico.
    @Put('detalles/:id_detalle')
    updateDetalle(
        @Param('id_detalle', ParseIntPipe) id_detalle: number,
        @Body() data: CreateUpdateCarritoDetalleDto
    ) {
        // Actualiza la cantidad de un ítem de detalle específico.
        return this.carritosService.updateDetalle(id_detalle, data);
    }

    @Delete('detalles/:id_detalle')
    @HttpCode(204)
    removeDetalle(@Param('id_detalle', ParseIntPipe) id_detalle: number) {
        // Elimina un ítem de detalle específico.
        return this.carritosService.removeDetalle(id_detalle);
    }
}