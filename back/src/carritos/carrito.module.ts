import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritosController } from './carrito.controller';
import { CarritosService } from './carrito.service';
import { Carrito } from '../entities/carrito.entity';
import { CarritoDetalle } from '../entities/carrito-detalle.entity';
import { Producto } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, CarritoDetalle, Producto])],
  controllers: [CarritosController],
  providers: [CarritosService],
  exports: [CarritosService],
})
export class CarritosModule {}
