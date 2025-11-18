import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradoresController } from './administrador.controller';
import { AdministradoresService } from './administrador.service';
import { Administrador } from '../entities/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
  exports: [AdministradoresService],
})
export class AdministradoresModule {}
