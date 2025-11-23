import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcaVehiculo } from '../entities/marca-vehiculo.entity';
import { CreateMarcaVehiculoDto, UpdateMarcaVehiculoDto } from './dto/marca-vehiculo.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(MarcaVehiculo)
    private readonly marcaRepo: Repository<MarcaVehiculo>,
  ) {}

  async create(data: CreateMarcaVehiculoDto) {
    const marca = this.marcaRepo.create(data);
    return this.marcaRepo.save(marca);
  }

  async findAll() {
    return this.marcaRepo.find({ relations: ['modelos'] });
  }

  async findOne(id: number) {
    const marca = await this.marcaRepo.findOne({
      where: { id_marca: id },
      relations: ['modelos'],
    });
    if (!marca) throw new NotFoundException('Marca no encontrada');
    return marca;
  }

  async update(id: number, data: UpdateMarcaVehiculoDto) {
    await this.marcaRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.marcaRepo.delete(id);
    return { deleted: true };
  }
}
