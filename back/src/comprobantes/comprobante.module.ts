import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprobantesController } from './comprobante.controller';
import { ComprobantesService } from './comprobante.service';
import { Comprobante } from '../entities/comprobante.entity';
import { Pedido } from '../entities/pedido.entity';
import { Cliente } from '../entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comprobante, Pedido, Cliente])],
  controllers: [ComprobantesController],
  providers: [ComprobantesService],
  exports: [ComprobantesService],
})
export class ComprobantesModule {}
