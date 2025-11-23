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
import { MarcaVehiculo } from './entities/marca-vehiculo.entity';
import { ModeloVehiculo } from './entities/modelo-vehiculo.entity';
import { ProductoModelo } from './entities/producto-modelo.entity';
import { CarritoDetalle } from './entities/carrito-detalle.entity';
import { Administrador } from './entities/administrador.entity';
import { CarritosModule } from './carritos/carrito.module';
import { PedidosModule } from './pedidos/pedido.module';
import { ComprobantesModule } from './comprobantes/comprobante.module';
import { Pedido } from './entities/pedido.entity';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { Comprobante } from './entities/comprobante.entity';
import { AdministradoresModule } from './administradores/administrador.module';
import { ReportesModule } from './reportes/reportes.module';
import { AuthModule } from './auth/auth.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { ProductoModelosModule } from './producto-modelos/producto-modelos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',              // Tipo de base de datos
      host: 'localhost',
      port: 3306,
      username: 'esant', //root
      password: 'password',
      database: 'DB_WEB', //ejemplodb
  entities: [Cliente,Carrito,Categoria,Producto,CarritoDetalle,Pedido,PedidoDetalle,Comprobante,Administrador,MarcaVehiculo,ModeloVehiculo,ProductoModelo
  ],       
      synchronize: true,             // ¡Solo para desarrollo! Crea tablas automáticamente
    }),
  ProductosModule,
    CategoriasModule,
    ClientesModule,
    CarritosModule,
    PedidosModule,ComprobantesModule
  ,AdministradoresModule

  ,ReportesModule
  ,AuthModule
  ,MarcasModule
  ,ModelosModule
  ,ProductoModelosModule
  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
