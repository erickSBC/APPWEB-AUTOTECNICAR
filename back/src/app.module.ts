import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/producto.module';
import { CategoriasModule } from './categorias/categoria.module';
  import { ClientesModule } from './clientes/cliente.module';
import { Cliente } from './entities/cliente.entity';
import { Carrito } from './entities/carrito.entity';
import { Categoria } from './entities/categoria.entity';
import { Producto } from './entities/producto.entity';
import { CarritoDetalle } from './entities/carrito-detalle.entity';
import { CarritosModule } from './carritos/carrito.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',              // Tipo de base de datos
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'ejemplodb',
      entities: [Cliente,Carrito,Categoria,Producto,CarritoDetalle,Cliente
   // <--- ¡Asegúrate de que ESTÉ aquí!
    // ... CarritoDetalle, y cualquier otra entidad
  ],       // Carga automáticamente todas las entidades
      synchronize: true,             // ¡Solo para desarrollo! Crea tablas automáticamente
    }),
    ProductosModule,
    CategoriasModule,
    ClientesModule,
    CarritosModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
