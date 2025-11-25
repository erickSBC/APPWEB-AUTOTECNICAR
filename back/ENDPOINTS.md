# API Endpoints Documentation - AutoTecnicar

**Última actualización:** 24 de Noviembre, 2025  
**Versión:** 1.0  
**Base URL:** `http://localhost:3000`

---

## Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Clientes](#clientes)
3. [Administradores](#administradores)
4. [Categorías](#categorías)
5. [Productos](#productos)
6. [Carritos](#carritos)
7. [Pedidos](#pedidos)
8. [Comprobantes](#comprobantes)
9. [Reportes](#reportes)
10. [Marcas de Vehículos](#marcas-de-vehículos)
11. [Modelos de Vehículos](#modelos-de-vehículos)
12. [Producto-Modelo](#producto-modelo)

---

## Autenticación

### Login Administrador
- **Método:** `POST`
- **Ruta:** `/auth/admin/login`
- **Descripción:** Autentica un administrador y retorna un JWT token

**Request Body:**
```json
{
  "correo": "admin@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Registrar Administrador
- **Método:** `POST`
- **Ruta:** `/auth/admin/register`
- **Descripción:** Registra un nuevo administrador

**Request Body:**
```json
{
  "correo": "newadmin@example.com",
  "password": "securePass123"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "administrador": {
    "id_admin": 1,
    "correo": "newadmin@example.com",
    "fecha_creacion": "2025-11-20T10:30:00Z"
  }
}
```

---

### Login Cliente
- **Método:** `POST`
- **Ruta:** `/auth/cliente/login`
- **Descripción:** Autentica un cliente y retorna un JWT token

**Request Body:**
```json
{
  "correo": "cliente@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Registrar Cliente
- **Método:** `POST`
- **Ruta:** `/auth/cliente/register`
- **Descripción:** Registra un nuevo cliente

**Request Body:**
```json
{
  "correo": "newcliente@example.com",
  "nombre": "Carlos",
  "apellido": "García",
  "password": "securePass123",
  "dni": "12345678A",
  "telefono": "+34912345678",
  "direccion": "Avenida Secundaria 456"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "cliente": {
    "id_cliente": 5,
    "correo": "newcliente@example.com",
    "nombre": "Carlos",
    "apellido": "García",
    "dni": "12345678A",
    "fecha_creacion": "2025-11-20T10:35:00Z"
  }
}
```

---

## Clientes

### Listar Clientes
- **Método:** `GET`
- **Ruta:** `/clientes`
- **Descripción:** Obtiene la lista completa de clientes

**Response (200 OK):**
```json
[
  {
    "id_cliente": 1,
    "nombre": "Carlos",
    "apellido": "García",
    "correo": "cliente@example.com",
    "dni": "12345678A",
    "telefono": "+34912345678",
    "direccion": "Avenida Secundaria 456",
    "fecha_creacion": "2025-11-01T09:00:00Z"
  }
]
```

---

### Obtener Cliente por ID
- **Método:** `GET`
- **Ruta:** `/clientes/:id`
- **Parámetros:** `id` (number) - ID del cliente

**Response (200 OK):**
```json
{
  "id_cliente": 1,
  "nombre": "Carlos",
  "correo": "cliente@example.com",
  "dni": "12345678A"
}
```

---

### Crear Cliente
- **Método:** `POST`
- **Ruta:** `/clientes`
- **Descripción:** Crea un nuevo cliente

**Request Body:**
```json
{
  "correo": "newcliente@example.com",
  "nombre": "Pedro",
  "apellido": "Sánchez",
  "dni": "87654321B",
  "password": "securePass123"
}
```

**Response (201 Created):**
```json
{
  "id_cliente": 2,
  "correo": "newcliente@example.com",
  "nombre": "Pedro",
  "apellido": "Sánchez",
  "dni": "87654321B"
}
```

---

### Actualizar Cliente
- **Método:** `PUT`
- **Ruta:** `/clientes/:id`
- **Parámetros:** `id` (number)

**Request Body:**
```json
{
  "nombre": "Pedro Updated",
  "dni": "87654321B"
}
```

**Response (200 OK):**
```json
{
  "id_cliente": 2,
  "nombre": "Pedro Updated",
  "dni": "87654321B"
}
```

---

### Eliminar Cliente
- **Método:** `DELETE`
- **Ruta:** `/clientes/:id`

**Response (204 No Content)**

---

## Administradores

### Listar Administradores
- **Método:** `GET`
- **Ruta:** `/administrador`

**Response (200 OK):**
```json
[
  {
    "id_admin": 1,
    "correo": "admin@example.com",
    "fecha_creacion": "2025-11-01T08:00:00Z"
  }
]
```

---

### Obtener Administrador por ID
- **Método:** `GET`
- **Ruta:** `/administrador/:id`

**Response (200 OK):**
```json
{
  "id_admin": 1,
  "correo": "admin@example.com"
}
```

---

### Crear Administrador
- **Método:** `POST`
- **Ruta:** `/administrador`

**Request Body:**
```json
{
  "correo": "admin2@example.com",
  "password": "securePass123"
}
```

**Response (201 Created):**
```json
{
  "id_admin": 2,
  "correo": "admin2@example.com"
}
```

---

### Actualizar Administrador
- **Método:** `PUT`
- **Ruta:** `/administrador/:id`

**Request Body:**
```json
{
  "correo": "admin2updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "id_admin": 2,
  "correo": "admin2updated@example.com"
}
```

---

### Eliminar Administrador
- **Método:** `DELETE`
- **Ruta:** `/administrador/:id`

**Response (204 No Content)**

---

## Categorías

### Listar Categorías
- **Método:** `GET`
- **Ruta:** `/categorias`

**Response (200 OK):**
```json
[
  {
    "id_categoria": 1,
    "nombre": "Herramientas",
    "descripcion": "Herramientas de mano",
    "id_padre": null,
    "fecha_creacion": "2025-11-01T10:00:00Z"
  }
]
```

---

### Obtener Categoría por ID
- **Método:** `GET`
- **Ruta:** `/categorias/:id`

**Response (200 OK):**
```json
{
  "id_categoria": 1,
  "nombre": "Herramientas",
  "descripcion": "Herramientas de mano",
  "id_padre": null
}
```

---

### Crear Categoría
- **Método:** `POST`
- **Ruta:** `/categorias`

**Request Body:**
```json
{
  "nombre": "Accesorios",
  "descripcion": "Accesorios para herramientas",
  "id_padre": null
}
```

**Response (201 Created):**
```json
{
  "id_categoria": 3,
  "nombre": "Accesorios",
  "descripcion": "Accesorios para herramientas"
}
```

---

### Actualizar Categoría
- **Método:** `PUT`
- **Ruta:** `/categorias/:id`

**Request Body:**
```json
{
  "nombre": "Accesorios Updated"
}
```

**Response (200 OK):**
```json
{
  "id_categoria": 3,
  "nombre": "Accesorios Updated"
}
```

---

### Eliminar Categoría
- **Método:** `DELETE`
- **Ruta:** `/categorias/:id`

**Response (204 No Content)**

---

## Productos

### Listar Productos
- **Método:** `GET`
- **Ruta:** `/productos`

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "descripcion": "Taladro profesional",
    "precio": 250.00,
    "stock": 15,
    "id_categoria": 2
  }
]
```

---

### Buscar Productos
- **Método:** `GET`
- **Ruta:** `/productos/search`
- **Query Parameters:** `pattern` (string) - Patrón de búsqueda

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "precio": 250.00,
    "stock": 15
  }
]
```

---

### Obtener Producto por ID
- **Método:** `GET`
- **Ruta:** `/productos/:id`

**Response (200 OK):**
```json
{
  "id_producto": 1,
  "nombre": "Taladro DeWalt",
  "descripcion": "Taladro profesional",
  "precio": 250.00,
  "stock": 15,
  "id_categoria": 2
}
```

---

### Crear Producto
- **Método:** `POST`
- **Ruta:** `/productos`

**Request Body:**
```json
{
  "nombre": "Sierra Circular",
  "descripcion": "Sierra circular profesional",
  "precio": 180.50,
  "stock": 20,
  "id_categoria": 2
}
```

**Response (201 Created):**
```json
{
  "id_producto": 10,
  "nombre": "Sierra Circular",
  "precio": 180.50,
  "stock": 20
}
```

---

### Actualizar Producto
- **Método:** `PUT`
- **Ruta:** `/productos/:id`

**Request Body:**
```json
{
  "nombre": "Sierra Circular Pro",
  "precio": 195.00,
  "stock": 18
}
```

**Response (200 OK):**
```json
{
  "id_producto": 10,
  "nombre": "Sierra Circular Pro",
  "precio": 195.00,
  "stock": 18
}
```

---

### Eliminar Producto
- **Método:** `DELETE`
- **Ruta:** `/productos/:id`

**Response (204 No Content)**

---

## Carritos

### Listar Carritos
- **Método:** `GET`
- **Ruta:** `/carrito`

**Response (200 OK):**
```json
[
  {
    "id_carrito": 1,
    "id_cliente": 1,
    "fecha_creacion": "2025-11-20T12:00:00Z",
    "detalles": []
  }
]
```

---

### Obtener Carrito por ID
- **Método:** `GET`
- **Ruta:** `/carrito/:id`

**Response (200 OK):**
```json
{
  "id_carrito": 1,
  "id_cliente": 1,
  "detalles": [
    {
      "id_carrito_detalle": 1,
      "cantidad": 2,
      "id_producto": 1,
      "producto": {
        "id_producto": 1,
        "nombre": "Taladro DeWalt",
        "precio": 250.00
      }
    }
  ]
}
```

---

### Crear Carrito
- **Método:** `POST`
- **Ruta:** `/carrito`

**Request Body:**
```json
{
  "id_cliente": 1
}
```

**Response (201 Created):**
```json
{
  "id_carrito": 2,
  "id_cliente": 1,
  "fecha_creacion": "2025-11-20T12:10:00Z"
}
```

---

### Agregar Detalle al Carrito
- **Método:** `POST`
- **Ruta:** `/carrito/:id/detalles`

**Request Body:**
```json
{
  "id_producto": 1,
  "cantidad": 2
}
```

**Response (201 Created):**
```json
{
  "id_carrito_detalle": 5,
  "cantidad": 2,
  "id_producto": 1,
  "producto": {
    "id_producto": 1,
    "nombre": "Taladro DeWalt"
  }
}
```

---

### Listar Detalles del Carrito
- **Método:** `GET`
- **Ruta:** `/carrito/:id/detalles`

**Response (200 OK):**
```json
[
  {
    "id_carrito_detalle": 1,
    "cantidad": 2,
    "id_producto": 1,
    "producto": {
      "id_producto": 1,
      "nombre": "Taladro DeWalt"
    }
  }
]
```

---

### Actualizar Carrito
- **Método:** `PUT`
- **Ruta:** `/carrito/:id`

**Request Body:**
```json
{
  "id_cliente": 2
}
```

**Response (200 OK):**
```json
{
  "id_carrito": 1,
  "id_cliente": 2
}
```

---

### Eliminar Carrito
- **Método:** `DELETE`
- **Ruta:** `/carrito/:id`

**Response (204 No Content)**

---

### Eliminar Detalle del Carrito
- **Método:** `DELETE`
- **Ruta:** `/carrito/detalles/:id_detalle`

**Response (204 No Content)**

---

## Pedidos

### Listar Pedidos
- **Método:** `GET`
- **Ruta:** `/pedidos`

**Response (200 OK):**
```json
[
  {
    "id_pedido": 1,
    "id_cliente": 1,
    "tipo_pedido": "online",
    "estado": "pendiente",
    "total": 1200.50,
    "fecha_creacion": "2025-11-20T12:20:00Z"
  }
]
```

---

### Obtener Pedido por ID
- **Método:** `GET`
- **Ruta:** `/pedidos/:id`

**Response (200 OK):**
```json
{
  "id_pedido": 1,
  "id_cliente": 1,
  "tipo_pedido": "online",
  "estado": "pendiente",
  "total": 1200.50,
  "detalles": [
    {
      "id_pedido_detalle": 1,
      "id_producto": 1,
      "cantidad": 1,
      "precio_unitario": 250.00
    }
  ]
}
```

---

### Crear Pedido
- **Método:** `POST`
- **Ruta:** `/pedidos`

**Request Body:**
```json
{
  "id_cliente": 1,
  "tipo_pedido": "online",
  "detalles": [
    {
      "id_producto": 1,
      "cantidad": 1,
      "precio_unitario": 250.00
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id_pedido": 5,
  "id_cliente": 1,
  "tipo_pedido": "online",
  "estado": "pendiente",
  "total": 250.00
}
```

---

### Actualizar Estado del Pedido
- **Método:** `PUT`
- **Ruta:** `/pedidos/:id`
- **Estados válidos:** `pendiente`, `pagado`, `procesando`, `enviado`, `entregado`, `cancelado`, `reembolso`

**Request Body:**
```json
{
  "estado": "pagado"
}
```

**Response (200 OK):**
```json
{
  "id_pedido": 1,
  "estado": "pagado"
}
```

---

### Eliminar Pedido
- **Método:** `DELETE`
- **Ruta:** `/pedidos/:id`

**Response (204 No Content)**

---

## Comprobantes

### Listar Comprobantes
- **Método:** `GET`
- **Ruta:** `/comprobantes`

**Response (200 OK):**
```json
[
  {
    "id_comprobante": 1,
    "id_pedido": 1,
    "id_cliente": 1,
    "monto_total": 1200.50,
    "tipo_pago": "tarjeta",
    "numero_comprobante": "F001-000001"
  }
]
```

---

### Obtener Comprobante por ID
- **Método:** `GET`
- **Ruta:** `/comprobantes/:id`

**Response (200 OK):**
```json
{
  "id_comprobante": 1,
  "id_pedido": 1,
  "id_cliente": 1,
  "monto_total": 1200.50,
  "tipo_pago": "tarjeta",
  "numero_comprobante": "F001-000001"
}
```

---

### Crear Comprobante
- **Método:** `POST`
- **Ruta:** `/comprobantes`

**Request Body:**
```json
{
  "id_pedido": 1,
  "id_cliente": 1,
  "monto_total": 1200.50,
  "tipo_pago": "tarjeta",
  "numero_comprobante": "F001-000001"
}
```

**Response (201 Created):**
```json
{
  "id_comprobante": 1,
  "id_pedido": 1,
  "id_cliente": 1,
  "monto_total": 1200.50,
  "tipo_pago": "tarjeta",
  "numero_comprobante": "F001-000001"
}
```

---

### Eliminar Comprobante
- **Método:** `DELETE`
- **Ruta:** `/comprobantes/:id`

**Response (204 No Content)**

---

## Reportes

### Ventas Totales
- **Método:** `GET`
- **Ruta:** `/reportes/ventas/totales`
- **Query Parameters (opcionales):** `desde`, `hasta` (ISO 8601)

**Response (200 OK):**
```json
{
  "total_ventas": 15650.75,
  "cantidad_pedidos": 12,
  "periodo": {
    "desde": "2025-01-01",
    "hasta": "2025-11-20"
  }
}
```

---

### Ventas por Producto
- **Método:** `GET`
- **Ruta:** `/reportes/ventas/por-producto`

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre_producto": "Taladro DeWalt",
    "cantidad_vendida": 5,
    "ingresos_totales": 1250.00
  }
]
```

---

### Pedidos por Día
- **Método:** `GET`
- **Ruta:** `/reportes/pedidos/por-dia`

**Response (200 OK):**
```json
[
  {
    "fecha": "2025-11-01",
    "cantidad_pedidos": 3,
    "monto_total": 2500.00
  }
]
```

---

### Clientes Top
- **Método:** `GET`
- **Ruta:** `/reportes/clientes/top`
- **Query Parameters (opcionales):** `limit` (default: 10)

**Response (200 OK):**
```json
[
  {
    "id_cliente": 1,
    "nombre_cliente": "Carlos García",
    "cantidad_pedidos": 8,
    "monto_total_gastado": 5200.75
  }
]
```

---

### Stock Bajo
- **Método:** `GET`
- **Ruta:** `/reportes/stock/bajo`
- **Query Parameters (opcionales):** `threshold` (default: 10)

**Response (200 OK):**
```json
[
  {
    "id_producto": 2,
    "nombre": "Destornillador Phillips",
    "stock_actual": 3,
    "precio": 15.50
  }
]
```

---

## Marcas de Vehículos

### Listar Marcas
- **Método:** `GET`
- **Ruta:** `/marcas`

**Response (200 OK):**
```json
[
  {
    "id_marca": 1,
    "nombre": "Toyota",
    "fecha_creacion": "2025-11-01T13:00:00Z"
  }
]
```

---

### Obtener Marca por ID
- **Método:** `GET`
- **Ruta:** `/marcas/:id`

**Response (200 OK):**
```json
{
  "id_marca": 1,
  "nombre": "Toyota"
}
```

---

### Crear Marca
- **Método:** `POST`
- **Ruta:** `/marcas`

**Request Body:**
```json
{
  "nombre": "BMW"
}
```

**Response (201 Created):**
```json
{
  "id_marca": 3,
  "nombre": "BMW"
}
```

---

### Actualizar Marca
- **Método:** `PUT`
- **Ruta:** `/marcas/:id`

**Request Body:**
```json
{
  "nombre": "BMW Premium"
}
```

**Response (200 OK):**
```json
{
  "id_marca": 3,
  "nombre": "BMW Premium"
}
```

---

### Eliminar Marca
- **Método:** `DELETE`
- **Ruta:** `/marcas/:id`

**Response (204 No Content)**

---

## Modelos de Vehículos

### Listar Modelos
- **Método:** `GET`
- **Ruta:** `/modelos`

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Corolla",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-01T13:30:00Z"
  }
]
```

---

### Obtener Modelo por ID
- **Método:** `GET`
- **Ruta:** `/modelos/:id`

**Response (200 OK):**
```json
{
  "id_modelo": 1,
  "nombre": "Corolla",
  "marca": "Toyota"
}
```

---

### Buscar Modelos por Marca
- **Método:** `GET`
- **Ruta:** `/modelos/marca/:marcaParam`
- **Parámetro:** `marcaParam` (string) - Puede ser una marca o múltiples separadas por coma
- **Descripción:** Busca modelos por marca. Soporta búsqueda exacta, parcial (contains) y múltiples marcas

**Ejemplos:**
```
GET /modelos/marca/Toyota         → Busca modelos marca "Toyota"
GET /modelos/marca/toyota         → Case-insensitive, también funciona
GET /modelos/marca/cor            → Búsqueda parcial (LIKE)
GET /modelos/marca/Toyota,Ford    → Busca modelos de Toyota O Ford
GET /modelos/marca/toyota,bmw,audi → Múltiples marcas
```

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Corolla",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-01T13:30:00Z"
  },
  {
    "id_modelo": 5,
    "nombre": "RAV4",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-02T13:30:00Z"
  }
]
```

---

### Crear Modelo
- **Método:** `POST`
- **Ruta:** `/modelos`

**Request Body:**
```json
{
  "nombre": "3 Series",
  "marca": "BMW"
}
```

**Response (201 Created):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series",
  "marca": "BMW"
}
```

---

### Actualizar Modelo
- **Método:** `PUT`
- **Ruta:** `/modelos/:id`

**Request Body:**
```json
{
  "nombre": "3 Series 2024",
  "marca": "BMW"
}
```

**Response (200 OK):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series 2024",
  "marca": "BMW"
}
```

---

### Eliminar Modelo
- **Método:** `DELETE`
- **Ruta:** `/modelos/:id`

**Response (204 No Content)**

---

## Producto-Modelo

### Crear Asignación Producto-Modelo
- **Método:** `POST`
- **Ruta:** `/producto-modelos`

**Request Body:**
```json
{
  "id_producto": 1,
  "id_modelo": 5
}
```

**Response (201 Created):**
```json
{
  "id_producto": 1,
  "id_modelo": 5,
  "fecha_creacion": "2025-11-20T13:50:00Z"
}
```

---

### Listar Todas las Asignaciones
- **Método:** `GET`
- **Ruta:** `/producto-modelos`

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "id_modelo": 5,
    "producto": {
      "id_producto": 1,
      "nombre": "Taladro DeWalt"
    },
    "modelo": {
      "id_modelo": 5,
      "nombre": "Corolla",
      "marca": "Toyota"
    }
  }
]
```

---

### Obtener Modelos de un Producto
- **Método:** `GET`
- **Ruta:** `/producto-modelos/producto/:id_producto`

**Response (200 OK):**
```json
[
  {
    "id_modelo": 5,
    "nombre": "Corolla",
    "marca": "Toyota"
  }
]
```

---

### Obtener Productos de un Modelo
- **Método:** `GET`
- **Ruta:** `/producto-modelos/modelo/:id_modelo`

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "precio": 250.00,
    "stock": 15
  }
]
```

---

### Desasignar Producto de Modelo
- **Método:** `DELETE`
- **Ruta:** `/producto-modelos/:id_producto/:id_modelo`

**Response (204 No Content)**

---

## Resumen de Códigos HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Operación exitosa sin contenido |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - Sin autenticación |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

**Documentación generada:** 24 de Noviembre, 2025
