import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaVehiculo } from '../entities/marca-vehiculo.entity';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MarcaVehiculo]), AuthModule],
  providers: [MarcasService],
  controllers: [MarcasController],
  exports: [MarcasService],
})
export class MarcasModule {}
