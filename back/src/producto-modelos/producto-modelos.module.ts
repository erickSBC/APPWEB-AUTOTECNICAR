import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModelo } from '../entities/producto-modelo.entity';
import { ProductoModelosService } from './producto-modelos.service';
import { ProductoModelosController } from './producto-modelos.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoModelo]), AuthModule],
  providers: [ProductoModelosService],
  controllers: [ProductoModelosController],
  exports: [ProductoModelosService],
})
export class ProductoModelosModule {}
