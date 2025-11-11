// src/categorias/categorias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async findAll() {
    return this.categoriaRepo.find({
      relations: ['productos'],
    });
  }

  async findOne(id: number) {
    return this.categoriaRepo.findOne({
      where: { id_categoria: id },
      relations: ['productos'],
    });
  }

  async create(data: Partial<Categoria>) {
    const categoria = this.categoriaRepo.create(data);
    return this.categoriaRepo.save(categoria);
  }

  async update(id: number, data: Partial<Categoria>) {
    await this.categoriaRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.categoriaRepo.delete(id);
    return { deleted: true };
  }
}
