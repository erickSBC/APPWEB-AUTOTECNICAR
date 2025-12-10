import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from '../entities/administrador.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectRepository(Administrador)
    private readonly adminRepo: Repository<Administrador>,
  ) { }

  async create(data: CreateAdministradorDto) {
    if (!data.password) throw new Error('Password requerido');
    const exists = await this.adminRepo.findOneBy({ correo: data.correo } as any);
    if (exists) throw new Error('Administrador ya existe');
    const hashed = await bcrypt.hash(String(data.password), 10);
    const nuevo = this.adminRepo.create({ ...data, password: hashed } as any);
    return this.adminRepo.save(nuevo);
  }

  async findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const a = await this.adminRepo.findOneBy({ id_admin: id } as any);
    if (!a) throw new NotFoundException('Administrador not found');
    return a;
  }

  async update(id: number, data: UpdateAdministradorDto) {
    await this.adminRepo.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.adminRepo.delete(id);
    return { deleted: true };
  }
  async searchByName(pattern: string) {
    const likePattern = `%${pattern.replace(/%/g, '\\%')}%`;
    const qb = this.adminRepo.createQueryBuilder('p')
      .where('LOWER(p.nombre) LIKE LOWER(:pattern) or LOWER(p.apellido) LIKE LOWER(:pattern)', { pattern: likePattern });

    return qb.getMany();
  }
}
