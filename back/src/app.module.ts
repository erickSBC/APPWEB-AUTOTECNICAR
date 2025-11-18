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
import { Administrador } from './entities/administrador.entity';
import { CarritosModule } from './carritos/carrito.module';
import { PedidosModule } from './pedidos/pedido.module';
import { ComprobantesModule } from './comprobantes/comprobante.module';
import { Pedido } from './entities/pedido.entity';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { Comprobante } from './entities/comprobante.entity';
import { AdministradoresModule } from './administradores/administrador.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',              // Tipo de base de datos
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'ejemplodb',
  entities: [Cliente,Carrito,Categoria,Producto,CarritoDetalle,Pedido,PedidoDetalle,Comprobante,Administrador
   // <--- ¡Asegúrate de que ESTÉ aquí!
    // ... CarritoDetalle, y cualquier otra entidad
  ],       // Carga automáticamente todas las entidades
      synchronize: true,             // ¡Solo para desarrollo! Crea tablas automáticamente
    }),
  ProductosModule,
    CategoriasModule,
    ClientesModule,
    CarritosModule,
    PedidosModule,ComprobantesModule
  ,AdministradoresModule
  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
