import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprobantesController } from './comprobante.controller';
import { ComprobantesService } from './comprobante.service';
import { Comprobante } from '../entities/comprobante.entity';
import { Pedido } from '../entities/pedido.entity';
import { Cliente } from '../entities/cliente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comprobante, Pedido, Cliente]),AuthModule],
  controllers: [ComprobantesController],
  providers: [ComprobantesService],
  exports: [ComprobantesService],
})
export class ComprobantesModule {}
