// src/productos/productos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './cliente.service';
import { ClientesController } from './cliente.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]),AuthModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
