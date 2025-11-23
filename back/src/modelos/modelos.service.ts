import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeloVehiculo } from '../entities/modelo-vehiculo.entity';
import { CreateModeloVehiculoDto, UpdateModeloVehiculoDto } from './dto/modelo-vehiculo.dto';

@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(ModeloVehiculo)
    private readonly modeloRepo: Repository<ModeloVehiculo>,
  ) {}

  async create(data: CreateModeloVehiculoDto) {
    const modelo = this.modeloRepo.create(data);
    return this.modeloRepo.save(modelo);
  }

  async findAll() {
    return this.modeloRepo.find({ relations: ['marca', 'productoModelos'] });
  }

  async findOne(id: number) {
    const modelo = await this.modeloRepo.findOne({
      where: { id_modelo: id },
      relations: ['marca', 'productoModelos'],
    });
    if (!modelo) throw new NotFoundException('Modelo no encontrado');
    return modelo;
  }

  async findByMarca(id_marca: number) {
    return this.modeloRepo.find({
      where: { marca: { id_marca } },
      relations: ['marca', 'productoModelos'],
    });
  }

  async update(id: number, data: UpdateModeloVehiculoDto) {
    await this.modeloRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.modeloRepo.delete(id);
    return { deleted: true };
  }
}
