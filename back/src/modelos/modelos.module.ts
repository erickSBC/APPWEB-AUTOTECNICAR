import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { AuthModule } from '../auth/auth.module';
import { ModeloVehiculo } from 'src/entities/modelo-vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloVehiculo]), AuthModule],
  providers: [ModelosService],
  controllers: [ModelosController],
  exports: [ModelosService],
})
export class ModelosModule {}
