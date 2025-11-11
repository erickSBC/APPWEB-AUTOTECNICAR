import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from '../entities/carrito.entity';
import { CarritoDetalle } from '../entities/carrito-detalle.entity';
import { CreateUpdateCarritoDetalleDto } from './dto/createupdate-carrito-detalle.dto';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class CarritosService {
    constructor(
        @InjectRepository(Carrito)
        private readonly carritoRepo: Repository<Carrito>,
        @InjectRepository(CarritoDetalle)
        private readonly detalleRepo: Repository<CarritoDetalle>,
        @InjectRepository(Producto)
        private readonly productoRepo: Repository<Producto>,
    ) { }

    async create(data: CreateCarritoDto) {
        const carritoExistente = await this.carritoRepo.findOne({
            where: {
                cliente: { id_cliente: data.id_cliente },
                estado: 'activo',
            },
            relations: ['cliente'],
        });

        if (carritoExistente) {
            // ✅ Ya existe: no crear otro
            return carritoExistente;
        }

        // 🚀 Si no existe, crear uno nuevo
        const carrito = this.carritoRepo.create({
            cliente: { id_cliente: data.id_cliente } as any,
            estado: data.estado ?? 'activo',
        });

        return this.carritoRepo.save(carrito);
    }

    async findAll() {
        return this.carritoRepo.find({ relations: ['cliente', 'detalles', 'detalles.producto'] });
    }

    async findOne(id: number) {
        const c = await this.carritoRepo.findOne({ where: { id_carrito: id }, relations: ['cliente', 'detalles', 'detalles.producto'] });
        if (!c) throw new NotFoundException('Carrito not found');
        return c;
    }

    async update(id: number, data: UpdateCarritoDto) {
        await this.carritoRepo.update(id, data as any);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.carritoRepo.delete(id);
        return { deleted: true };
    }

    // detalles
    async addDetalle(id_carrito: number, dto: CreateUpdateCarritoDetalleDto) {
        // 1. Verificar Carrito y Producto (Tu lógica actual)
        const carrito = await this.findOne(id_carrito);
        if (!carrito) throw new NotFoundException('Carrito no encontrado');

        const producto = await this.productoRepo.findOne({
            where: { id_producto: dto.id_producto } as any
        });
        if (!producto) throw new NotFoundException('Producto no encontrado');

        // 💡 Paso 2: BUSCAR DETALLE EXISTENTE
        let detalleExistente = await this.detalleRepo.findOne({
            where: {
                carrito: { id_carrito },
                producto: { id_producto: dto.id_producto }
            } as any,
        });

        // 💡 Paso 3: LÓGICA DE ACTUALIZACIÓN O CREACIÓN
        if (detalleExistente) {
            // --- ACTUALIZAR ---

            // Asume que el precio unitario del DTO es el precio actual del producto.
            // Si no usas el precio del DTO, usa 'producto.precio_actual'
            const nuevaCantidad = detalleExistente.cantidad + dto.cantidad;

            // Actualizar el detalle existente
            detalleExistente.cantidad = nuevaCantidad;
            detalleExistente.precio_unitario = dto.precio_unitario; // Actualizar por si el precio cambió
            detalleExistente.subtotal = nuevaCantidad * dto.precio_unitario;

            return this.detalleRepo.save(detalleExistente);

        } else {
            // --- CREAR NUEVO ---

            const subtotal = Number(dto.cantidad) * Number(dto.precio_unitario);

            const nuevoDetalle = this.detalleRepo.create({
                carrito: { id_carrito } as any,
                producto: { id_producto: dto.id_producto } as any,
                cantidad: dto.cantidad,
                precio_unitario: dto.precio_unitario,
                subtotal,
            });

            this.detalleRepo.save(nuevoDetalle).then(r=>{
                return {
                    "id_detalle": r.id_detalle,
                    "id_carrito": r.carrito.id_carrito,
                    "id_producto": r.producto.id_producto,
                    "cantidad": r.cantidad,
                    "precio_unitario": r.precio_unitario,
                    subtotal
                }
            });
        }
    }
    // En tu CarritosService

    async updateDetalle(id_carrito: number, dto: CreateUpdateCarritoDetalleDto) {
        // 1. Validar la Cantidad
        if (dto.cantidad < 0) {

            throw new BadRequestException('La cantidad no puede ser negativa.');
        }

        // 2. Buscar Detalle Existente
        let detalleExistente = await this.detalleRepo.findOne({
            where: {
                carrito: { id_carrito },
                producto: dto.id_producto//??
            } as any,
        });

        if (!detalleExistente) {
            // Esto indica que el producto que se intenta actualizar no está en el carrito.
            throw new NotFoundException('Producto no encontrado en el carrito.');
        }

        // 💡 3. Lógica de Eliminación (Resetear a cero)
        if (dto.cantidad === 0) {
            // Si la cantidad es cero, eliminamos el registro del detalle.
            await this.removeDetalle(detalleExistente.id_detalle);
            return { message: `Producto ${dto.id_producto} eliminado del carrito ${id_carrito}.` };
        }

        // 💡 4. Lógica de Actualización (Nueva Cantidad > 0)

        // Actualizar las propiedades del detalle
        detalleExistente.cantidad = dto.cantidad;
        detalleExistente.precio_unitario = dto.precio_unitario; // Siempre actualizar al precio actual
        detalleExistente.subtotal = dto.cantidad * dto.precio_unitario;

        // Guardar los cambios (TypeORM actualiza el registro)
        return this.detalleRepo.save(detalleExistente);
    }

    async listDetalles(id_carrito: number) {
        const carrito = await this.findOne(id_carrito);
        return carrito.detalles;
    }

    async removeDetalle(id_detalle: number) {
        await this.detalleRepo.delete(id_detalle);
        return { deleted: true };
    }
}
