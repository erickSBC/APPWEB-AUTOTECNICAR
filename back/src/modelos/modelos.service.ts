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
    return this.modeloRepo.find({ relations: ['productoModelos'] });
  }

  async findOne(id: number) {
    const modelo = await this.modeloRepo.findOne({
      where: { id_modelo: id },
      relations: ['productoModelos'],
    });
    if (!modelo) throw new NotFoundException('Modelo no encontrado');
    return modelo;
  }

  async findByMarca(id_marca: number) {
   
  }

  async findByMarcaString(marcaParam: string) {
    if (!marcaParam || marcaParam.trim().length === 0) {
      return [];
    }

    // Dividir por comas para soportar múltiples marcas
    const marcas = marcaParam
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0)
      .map((m) => m.toLowerCase());

    if (marcas.length === 0) {
      return [];
    }

    if (marcas.length === 1) {
      // Búsqueda para una sola marca (exacta o contiene)
      const marca = marcas[0];
      return this.modeloRepo
        .createQueryBuilder('modelo')
        .where('LOWER(modelo.marca) = :marca', { marca })
        .orWhere('LOWER(modelo.marca) LIKE :likeMarc', { likeMarc: `%${marca}%` })
        .orderBy('modelo.nombre', 'ASC')
        .getMany();
    }

    // Búsqueda para múltiples marcas (IN clause)
    return this.modeloRepo
      .createQueryBuilder('modelo')
      .where('LOWER(modelo.marca) IN (:...marcas)', { marcas })
      .orderBy('modelo.nombre', 'ASC')
      .getMany();
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
