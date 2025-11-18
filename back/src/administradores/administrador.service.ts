import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from '../entities/administrador.entity';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectRepository(Administrador)
    private readonly adminRepo: Repository<Administrador>,
  ) {}

  async create(data: CreateAdministradorDto) {
    const admin = this.adminRepo.create({ ...data } as any);
    return this.adminRepo.save(admin);
  }

  async findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const a = await this.adminRepo.findOneBy({ id_administrador: id } as any);
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
}
