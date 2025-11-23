import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoModelo } from '../entities/producto-modelo.entity';
import { CreateProductoModeloDto, UpdateProductoModeloDto } from './dto/producto-modelo.dto';

@Injectable()
export class ProductoModelosService {
  constructor(
    @InjectRepository(ProductoModelo)
    private readonly productoModeloRepo: Repository<ProductoModelo>,
  ) {}

  async create(data: CreateProductoModeloDto) {
    const productoModelo = this.productoModeloRepo.create(data);
    return this.productoModeloRepo.save(productoModelo);
  }

  async findAll() {
    return this.productoModeloRepo.find({
      relations: ['producto', 'modelo'],
    });
  }

  async findByProducto(id_producto: number) {
    return this.productoModeloRepo.find({
      where: { id_producto },
      relations: ['producto', 'modelo', 'modelo.marca'],
    });
  }

  async findByModelo(id_modelo: number) {
    return this.productoModeloRepo.find({
      where: { id_modelo },
      relations: ['producto', 'modelo'],
    });
  }

  async findOne(id_producto: number, id_modelo: number) {
    const pm = await this.productoModeloRepo.findOne({
      where: { id_producto, id_modelo },
      relations: ['producto', 'modelo'],
    });
    if (!pm) throw new NotFoundException('Relación Producto-Modelo no encontrada');
    return pm;
  }

  async update(id_producto: number, id_modelo: number, data: UpdateProductoModeloDto) {
    await this.productoModeloRepo.update(
      { id_producto, id_modelo },
      data,
    );
    return this.findOne(id_producto, id_modelo);
  }

  async remove(id_producto: number, id_modelo: number) {
    await this.productoModeloRepo.delete({ id_producto, id_modelo });
    return { deleted: true };
  }
}
