import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosController } from './pedido.controller';
import { PedidosService } from './pedido.service';
import { Pedido } from '../entities/pedido.entity';
import { PedidoDetalle } from '../entities/pedido-detalle.entity';
import { Producto } from '../entities/producto.entity';
import { Carrito } from '../entities/carrito.entity';
import { CarritosModule } from 'src/carritos/carrito.module';
import { ComprobantesModule } from 'src/comprobantes/comprobante.module';

@Module({
  imports: [CarritosModule,ComprobantesModule,TypeOrmModule.forFeature([Pedido, PedidoDetalle, Producto,Carrito])],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
