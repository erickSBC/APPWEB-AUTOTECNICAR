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

  // Buscar clientes por patron de string
  async searchByName(pattern: string) {
    const likePattern = `%${pattern.replace(/%/g, '\\%')}%`;
    const qb = this.clienteRepo.createQueryBuilder('p')
      .where('LOWER(p.nombre) LIKE LOWER(:pattern) or LOWER(p.apellido) LIKE LOWER(:pattern)', { pattern: likePattern });

    return qb.getMany();
  }
}
