// src/productos/productos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';
import { Categoria } from '../entities/categoria.entity';
import { CreateProductoDto } from './create-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) { }



  async findOne(id: number) {
    return this.productoRepo.findOne({
      where: { id_producto: id },
      relations: ['categoria'],
    });
  }

  async create(data: CreateProductoDto) {
    const producto = this.productoRepo.create({
      ...data,
      categoria: { id_categoria: data.id_categoria } as Categoria,
    });
    return this.productoRepo.save(producto);
  }

  async update(id: number, data: Partial<Producto>) {
    await this.productoRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productoRepo.delete(id);
    return { deleted: true };
  }

  // Search products by name pattern (case-insensitive)
  async searchByName(pattern: string) {
    const likePattern = `%${pattern.replace(/%/g, '\\%')}%`;
    // Use query builder to perform a case-insensitive search that works across DBs
    const qb = this.productoRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria', 'categoria')
      .where('LOWER(p.nombre) LIKE LOWER(:pattern)', { pattern: likePattern });

    return qb.getMany();
  }
  // src/productos/productos.service.ts
  async findAllPaginated(skip: number, take: number) {
    const [items, total] = await this.productoRepo.findAndCount({
      relations: ['categoria'],
      skip,
      take,
    });
    return {
      total,
      skip,
      take,
      items,
    };
  }
  // src/productos/productos.service.ts
  async filterProducts(params: {
    nombre?: string;
    categorias?: number[];
    skip: number;
    take: number;
  }) {
    const { nombre, categorias, skip, take } = params;

    const qb = this.productoRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria', 'categoria');

    /** Filtro por nombre */
    if (nombre && nombre.trim() !== '') {
      qb.andWhere('LOWER(p.nombre) LIKE LOWER(:nombre)', {
        nombre: `%${nombre.trim()}%`,
      });
    }

    /** Filtro por una o múltiples categorías */
    if (categorias && categorias.length > 0) {
      qb.andWhere('categoria.id_categoria IN (:...categorias)', {
        categorias,
      });
    }

    /** Paginación */
    qb.skip(skip).take(take);

    const [items, total] = await qb.getManyAndCount();

    return {
      total,
      skip,
      take,
      items,
    };
  }

}
