// src/productos/productos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { ProductosService } from './producto.service';
import { ProductosController } from './producto.controller';
import { CategoriasModule } from '../categorias/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), CategoriasModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
