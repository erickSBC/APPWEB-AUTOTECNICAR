import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  // ------------------ Carrito base ------------------

  async create(data: CreateCarritoDto) {
    const carritoExistente = await this.carritoRepo.findOne({
      where: {
        cliente: { id_cliente: data.id_cliente },
        estado: 'activo',
      } as any,
      relations: ['cliente'],
    });

    if (carritoExistente) {
    // si ya existe: no crear otro
      return carritoExistente;
    }

    const carrito = this.carritoRepo.create({
      cliente: { id_cliente: data.id_cliente } as any,
      estado: data.estado ?? 'activo',
    });

    return this.carritoRepo.save(carrito);
  }

  async findAll() {
    return this.carritoRepo.find({
      relations: ['cliente', 'detalles', 'detalles.producto'],
    });
  }

  async findOne(id: number) {
    const c = await this.carritoRepo.findOne({
      where: { id_carrito: id } as any,
      relations: ['cliente', 'detalles', 'detalles.producto'],
    });
    if (!c) throw new NotFoundException('Carrito not found');
    return c;
  }

  async update(id: number, data: UpdateCarritoDto) {
    await this.carritoRepo.update(id, data as any);
    return this.findOne(id);
  }

async remove(id: number) {
    // 1. Cargar el carrito, sus detalles y los productos para obtener las cantidades.
    const carrito = await this.carritoRepo.findOne({
        where: { id_carrito: id } as any,
        relations: ['detalles', 'detalles.producto'], 
    });

    if (!carrito) {
        throw new NotFoundException(`Carrito con ID ${id} no encontrado.`);
    }

    // 2. devolver stock de todos los detalles
    for (const detalle of carrito.detalles) {
        const producto = detalle.producto;
        producto.stock += detalle.cantidad;
        // guardar cada producto con su stock actualizado
        await this.productoRepo.save(producto); 
    }

    // 3. Eliminar el carrito, se borra también los detalles
    await this.carritoRepo.remove(carrito);

    return { deleted: true, message: 'Carrito eliminado y stock devuelto exitosamente.' };
}

  // ------------------ Detalles + Stock ------------------

  /**
   * Agregar producto al carrito.
   * - Verifica stock disponible
   * - Si ya existe el detalle: aumenta cantidad
   * - Siempre descuenta stock del producto
   */
  async addDetalle(id_carrito: number, dto: CreateUpdateCarritoDetalleDto) {
    if (dto.cantidad <= 0) {
      throw new BadRequestException(
        'La cantidad debe ser mayor que cero para agregar al carrito.',
      );
    }

    const carrito = await this.findOne(id_carrito);
    if (!carrito) throw new NotFoundException('Carrito no encontrado');

    const producto = await this.productoRepo.findOne({
      where: { id_producto: dto.id_producto } as any,
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    // Buscar si ya existe este producto en el carrito
    let detalleExistente = await this.detalleRepo.findOne({
      where: {
        carrito: { id_carrito },
        producto: { id_producto: dto.id_producto },
      } as any,
    });

    if (detalleExistente) {
      // Aumentar cantidad (controlando stock)
      const cantidadAdicional = dto.cantidad;

      if (producto.stock < cantidadAdicional) {
        throw new BadRequestException(
          `Stock insuficiente. Stock disponible: ${producto.stock}, cantidad solicitada adicional: ${cantidadAdicional}.`,
        );
      }

      // Descontar del stock
      producto.stock -= cantidadAdicional;
      await this.productoRepo.save(producto);

      const nuevaCantidad = detalleExistente.cantidad + cantidadAdicional;
      detalleExistente.cantidad = nuevaCantidad;
      detalleExistente.precio_unitario = producto.precio;
      detalleExistente.subtotal = nuevaCantidad * producto.precio;

      const guardado = await this.detalleRepo.save(detalleExistente);

      const detalleConProducto = await this.detalleRepo.findOne({
        where: { id_detalle: guardado.id_detalle } as any,
        relations: ['producto'],
      });
      if (!detalleConProducto)
        throw new NotFoundException('Detalle not found after save');

      return {
        id_detalle: detalleConProducto.id_detalle,
        cantidad: detalleConProducto.cantidad,
        precio_unitario: detalleConProducto.precio_unitario,
        subtotal: detalleConProducto.subtotal,
        producto: {
          id_producto: detalleConProducto.producto.id_producto,
          nombre: detalleConProducto.producto.nombre,
          imagen_url: detalleConProducto.producto.imagen,
          stock: detalleConProducto.producto.stock,
          precio_unitario: detalleConProducto.producto.precio,
        },
      };
    } else {
      // Crear nuevo detalle controlando stock
      const cantidadSolicitada = dto.cantidad;

      if (producto.stock < cantidadSolicitada) {
        throw new BadRequestException(
          `Stock insuficiente. Stock disponible: ${producto.stock}, cantidad solicitada: ${cantidadSolicitada}.`,
        );
      }

      // Descontar del stock
      producto.stock -= cantidadSolicitada;
      await this.productoRepo.save(producto);

      const subtotal = Number(cantidadSolicitada) * Number(producto.precio);

      const nuevoDetalle = this.detalleRepo.create({
        carrito: { id_carrito } as any,
        producto: { id_producto: dto.id_producto } as any,
        cantidad: cantidadSolicitada,
        precio_unitario: producto.precio,
        subtotal,
      });

      const guardado = await this.detalleRepo.save(nuevoDetalle);
      const detalleConProducto = await this.detalleRepo.findOne({
        where: { id_detalle: guardado.id_detalle } as any,
        relations: ['producto'],
      });

      if (!detalleConProducto)
        throw new NotFoundException('Detalle not found after save');

      return {
        id_detalle: detalleConProducto.id_detalle,
        cantidad: detalleConProducto.cantidad,
        precio_unitario: detalleConProducto.precio_unitario,
        subtotal: detalleConProducto.subtotal,
        producto: {
          id_producto: detalleConProducto.producto.id_producto,
          nombre: detalleConProducto.producto.nombre,
          imagen_url: detalleConProducto.producto.imagen,
          stock: detalleConProducto.producto.stock,
          precio_unitario: detalleConProducto.producto.precio,
        },
      };
    }
  }

  /**
   * Actualizar un detalle específico del carrito (por id_detalle).
   * - Ajusta stock según la diferencia de cantidades
   * - Si cantidad = 0 => elimina el detalle y devuelve todo el stock de ese ítem
   */
  async updateDetalle(
    id_detalle: number,
    dto: CreateUpdateCarritoDetalleDto,
  ) {
    if (dto.cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa.');
    }

    // Cargar detalle con producto y carrito
    const detalleExistente = await this.detalleRepo.findOne({
      where: { id_detalle } as any,
      relations: ['producto', 'carrito'],
    });

    if (!detalleExistente) {
      throw new NotFoundException(
        `Detalle con ID ${id_detalle} no encontrado.`,
      );
    }

    const producto = await this.productoRepo.findOne({
      where: { id_producto: detalleExistente.producto.id_producto } as any,
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const cantidadActual = detalleExistente.cantidad;
    const nuevaCantidad = dto.cantidad;

    // Si nueva cantidad = 0 ⇒ devolver todo el stock y eliminar detalle
    if (nuevaCantidad === 0) {
      producto.stock += cantidadActual;
      await this.productoRepo.save(producto);

      await this.detalleRepo.delete(id_detalle);
      return {
        message: `Producto ${producto.id_producto} eliminado del carrito ${detalleExistente.carrito.id_carrito}.`,
      };
    }

    // Diferencia entre nueva y actual
    const diferencia = nuevaCantidad - cantidadActual;

    if (diferencia > 0) {
      // Aumentando cantidad,caso si no alcanza stock
      if (producto.stock < diferencia) {
        throw new BadRequestException(
          `Stock insuficiente. Stock disponible: ${producto.stock}, cantidad adicional solicitada: ${diferencia}.`,
        );
      }
      producto.stock -= diferencia;
    } else if (diferencia < 0) {
      //  Disminuyendo cantidad,se devuelve stock
      producto.stock += Math.abs(diferencia);
    }

    await this.productoRepo.save(producto);

    detalleExistente.cantidad = nuevaCantidad;
    detalleExistente.precio_unitario = producto.precio;
    detalleExistente.subtotal = nuevaCantidad * producto.precio;

    const guardado = await this.detalleRepo.save(detalleExistente);

    const detalleConProducto = await this.detalleRepo.findOne({
      where: { id_detalle: guardado.id_detalle } as any,
      relations: ['producto'],
    });

    if (!detalleConProducto)
      throw new NotFoundException('Detalle not found after save');

    return {
      id_detalle: detalleConProducto.id_detalle,
      cantidad: detalleConProducto.cantidad,
      precio_unitario: detalleConProducto.precio_unitario,
      subtotal: detalleConProducto.subtotal,
      producto: {
        id_producto: detalleConProducto.producto.id_producto,
        nombre: detalleConProducto.producto.nombre,
        imagen_url: detalleConProducto.producto.imagen,
        stock: detalleConProducto.producto.stock,
        precio_unitario: detalleConProducto.producto.precio,
      },
    };
  }

  async listDetalles(id_carrito: number) {
    const carrito = await this.findOne(id_carrito);
    return carrito.detalles;
  }

  /**
   * Eliminar un detalle del carrito.
   * - Devuelve al stock la cantidad asociada a ese detalle.
   */
  async removeDetalle(id_detalle: number) {
    const detalle = await this.detalleRepo.findOne({
      where: { id_detalle } as any,
      relations: ['producto'],
    });

    if (!detalle) {
      // Puedes lanzar NotFound o simplemente indicar que no había nada
      throw new NotFoundException(
        `Detalle con ID ${id_detalle} no encontrado.`,
      );
    }

    const producto = detalle.producto;

    // Devolver stock al producto
    producto.stock += detalle.cantidad;
    await this.productoRepo.save(producto);

    await this.detalleRepo.delete(id_detalle);
    return { deleted: true };
  }
}
