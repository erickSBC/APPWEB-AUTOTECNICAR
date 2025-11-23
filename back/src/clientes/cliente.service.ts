// src/clientes/clientes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Categoria } from '../entities/categoria.entity';
import { CreateClienteDto } from './create-cliente.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) { }

  async findAll() {
    return this.clienteRepo.find();
  }

  async findOne(id: number) {
    return this.clienteRepo.findOne({
      where: { id_cliente: id },
    });
  }

  async create(data: CreateClienteDto) {
    const defaultPassword = 'changeme123';
    const plain = data.password ?? defaultPassword;
    const hashed = await bcrypt.hash(String(plain), 10);
    const cliente = this.clienteRepo.create({
      ...data,
      password: hashed,
    });
    return this.clienteRepo.save(cliente);
  }

  async update(id: number, data: Partial<CreateClienteDto>) {
    // If password provided, hash it before updating
    const toUpdate: any = { ...data };
    if (data && (data as any).password) {
      toUpdate.password = await bcrypt.hash(String((data as any).password), 10);
    }
    await this.clienteRepo.update(id, toUpdate);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.clienteRepo.delete(id);
    return { deleted: true };
  }

  // Search products by name pattern (case-insensitive)
  async searchByName(pattern: string) {
    const likePattern = `%${pattern.replace(/%/g, '\\%')}%`;
    // Use query builder to perform a case-insensitive search that works across DBs
    const qb = this.clienteRepo.createQueryBuilder('p')
      .where('LOWER(p.nombre) LIKE LOWER(:pattern)', { pattern: likePattern });

    return qb.getMany();
  }
}
