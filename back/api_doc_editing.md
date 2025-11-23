# API Documentation - AutoTecnicar E-Commerce Backend

## Tabla de Contenidos
1. [Autenticación](#autenticación)
2. [Administradores](#administradores)
3. [Clientes](#clientes)
4. [Categorías](#categorías)
5. [Productos](#productos)
6. [Carritos](#carritos)
7. [Pedidos](#pedidos)
8. [Comprobantes](#comprobantes)
9. [Reportes](#reportes)
10. [Marcas de Vehículos](#marcas-de-vehículos)
11. [Modelos de Vehículos](#modelos-de-vehículos)
12. [Asignación Producto-Modelo](#asignación-producto-modelo)

---

## Autenticación

### POST /auth/admin/login
Login de administrador con credenciales.

**Request:**
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

**Error (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

### POST /auth/admin/register
Registrar nuevo administrador (requiere permisos superadmin).

**Request:**
```json
{
  "correo": "newadmin@example.com",
  "password": "securePass123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "superadmin",
  "telefono": "+34912345678",
  "direccion": "Calle Principal 123"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "administrador": {
    "id_admin": 1,
    "correo": "newadmin@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "superadmin",
    "fecha_creacion": "2025-11-20T10:30:00Z"
  }
}
```

---

### POST /auth/cliente/login
Login de cliente con credenciales.

**Request:**
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

### POST /auth/cliente/register
Registrar nuevo cliente.

**Request:**
```json
{
  "correo": "newcliente@example.com",
  "password": "securePass123",
  "nombre": "Carlos",
  "apellido": "García",
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
    "telefono": "+34912345678",
    "direccion": "Avenida Secundaria 456",
    "fecha_creacion": "2025-11-20T10:35:00Z"
  }
}
```

---

## Administradores

**Autenticación requerida:** JWT Token (header: `Authorization: Bearer <token>`)
**Roles permitidos:** `superadmin` (para crear/actualizar/eliminar), `superadmin`/`vendedor` (para listar/obtener)

### GET /administradores
Listar todos los administradores.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id_admin": 1,
    "correo": "admin@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "superadmin",
    "telefono": "+34912345678",
    "direccion": "Calle Principal 123",
    "fecha_creacion": "2025-11-01T08:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:30:00Z"
  }
]
```

---

### GET /administradores/:id
Obtener administrador por ID.

**Path Parameters:**
- `id` (number): ID del administrador

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id_admin": 1,
  "correo": "admin@example.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "superadmin",
  "telefono": "+34912345678",
  "direccion": "Calle Principal 123",
  "fecha_creacion": "2025-11-01T08:00:00Z",
  "fecha_actualizacion": "2025-11-20T10:30:00Z"
}
```

---

### POST /administradores
Crear nuevo administrador.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "correo": "admin2@example.com",
  "password": "securePass123",
  "nombre": "María",
  "apellido": "López",
  "rol": "vendedor",
  "telefono": "+34987654321",
  "direccion": "Calle Secundaria 789"
}
```

**Response (201 Created):**
```json
{
  "id_admin": 2,
  "correo": "admin2@example.com",
  "nombre": "María",
  "apellido": "López",
  "rol": "vendedor",
  "telefono": "+34987654321",
  "direccion": "Calle Secundaria 789",
  "fecha_creacion": "2025-11-20T10:40:00Z"
}
```

---

### PUT /administradores/:id
Actualizar administrador.

**Path Parameters:**
- `id` (number): ID del administrador

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "María Updated",
  "telefono": "+34912121212",
  "rol": "superadmin"
}
```

**Response (200 OK):**
```json
{
  "id_admin": 2,
  "correo": "admin2@example.com",
  "nombre": "María Updated",
  "apellido": "López",
  "rol": "superadmin",
  "telefono": "+34912121212",
  "direccion": "Calle Secundaria 789",
  "fecha_actualizacion": "2025-11-20T11:00:00Z"
}
```

---

### DELETE /administradores/:id
Eliminar administrador.

**Path Parameters:**
- `id` (number): ID del administrador

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Clientes

### GET /clientes
Listar todos los clientes.

**Response (200 OK):**
```json
[
  {
    "id_cliente": 1,
    "nombre": "Carlos",
    "apellido": "García",
    "correo": "cliente@example.com",
    "telefono": "+34912345678",
    "direccion": "Avenida Secundaria 456",
    "fecha_creacion": "2025-11-01T09:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:35:00Z"
  }
]
```

---

### GET /clientes/:id
Obtener cliente por ID.

**Path Parameters:**
- `id` (number): ID del cliente

**Response (200 OK):**
```json
{
  "id_cliente": 1,
  "nombre": "Carlos",
  "apellido": "García",
  "correo": "cliente@example.com",
  "telefono": "+34912345678",
  "direccion": "Avenida Secundaria 456",
  "fecha_creacion": "2025-11-01T09:00:00Z",
  "fecha_actualizacion": "2025-11-20T10:35:00Z"
}
```

---

### POST /clientes
Crear nuevo cliente.

**Request:**
```json
{
  "correo": "newcliente@example.com",
  "nombre": "Pedro",
  "apellido": "Sánchez",
  "telefono": "+34934567890",
  "direccion": "Plaza Mayor 10"
}
```

**Response (201 Created):**
```json
{
  "id_cliente": 2,
  "correo": "newcliente@example.com",
  "nombre": "Pedro",
  "apellido": "Sánchez",
  "telefono": "+34934567890",
  "direccion": "Plaza Mayor 10",
  "fecha_creacion": "2025-11-20T11:10:00Z"
}
```

---

### PUT /clientes/:id
Actualizar cliente.

**Path Parameters:**
- `id` (number): ID del cliente

**Request:**
```json
{
  "nombre": "Pedro Updated",
  "telefono": "+34912121212"
}
```

**Response (200 OK):**
```json
{
  "id_cliente": 2,
  "correo": "newcliente@example.com",
  "nombre": "Pedro Updated",
  "apellido": "Sánchez",
  "telefono": "+34912121212",
  "direccion": "Plaza Mayor 10",
  "fecha_actualizacion": "2025-11-20T11:15:00Z"
}
```

---

### DELETE /clientes/:id
Eliminar cliente.

**Path Parameters:**
- `id` (number): ID del cliente

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Categorías

### GET /categorias
Listar todas las categorías.

**Query Parameters (opcionales):**
- `skip` (number): Número de registros a saltar
- `take` (number): Número de registros a obtener

**Response (200 OK):**
```json
[
  {
    "id_categoria": 1,
    "nombre": "Herramientas",
    "descripcion": "Herramientas de mano y eléctricas",
    "imagen": "https://example.com/herramientas.jpg",
    "id_padre": null,
    "fecha_creacion": "2025-11-01T10:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:50:00Z",
    "hijos": []
  },
  {
    "id_categoria": 2,
    "nombre": "Taladros",
    "descripcion": "Taladros eléctricos diversos",
    "imagen": "https://example.com/taladros.jpg",
    "id_padre": 1,
    "fecha_creacion": "2025-11-02T10:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:50:00Z",
    "hijos": []
  }
]
```

---

### GET /categorias/:id
Obtener categoría por ID con sus productos.

**Path Parameters:**
- `id` (number): ID de la categoría

**Response (200 OK):**
```json
{
  "id_categoria": 1,
  "nombre": "Herramientas",
  "descripcion": "Herramientas de mano y eléctricas",
  "imagen": "https://example.com/herramientas.jpg",
  "id_padre": null,
  "fecha_creacion": "2025-11-01T10:00:00Z",
  "fecha_actualizacion": "2025-11-20T10:50:00Z",
  "productos": [
    {
      "id_producto": 5,
      "nombre": "Taladro DeWalt",
      "descripcion": "Taladro profesional",
      "precio": 250.00,
      "stock": 15,
      "imagen": "https://example.com/taladro-dewalt.jpg"
    }
  ],
  "hijos": [
    {
      "id_categoria": 2,
      "nombre": "Taladros",
      "id_padre": 1
    }
  ]
}
```

---

### POST /categorias
Crear nueva categoría.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "Accesorios",
  "descripcion": "Accesorios para herramientas",
  "imagen": "https://example.com/accesorios.jpg",
  "id_padre": null
}
```

**Response (201 Created):**
```json
{
  "id_categoria": 3,
  "nombre": "Accesorios",
  "descripcion": "Accesorios para herramientas",
  "imagen": "https://example.com/accesorios.jpg",
  "id_padre": null,
  "fecha_creacion": "2025-11-20T11:20:00Z"
}
```

---

### PUT /categorias/:id
Actualizar categoría.

**Path Parameters:**
- `id` (number): ID de la categoría

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "Accesorios Updated",
  "descripcion": "Accesorios variados para herramientas"
}
```

**Response (200 OK):**
```json
{
  "id_categoria": 3,
  "nombre": "Accesorios Updated",
  "descripcion": "Accesorios variados para herramientas",
  "imagen": "https://example.com/accesorios.jpg",
  "id_padre": null,
  "fecha_actualizacion": "2025-11-20T11:25:00Z"
}
```

---

### DELETE /categorias/:id
Eliminar categoría.

**Path Parameters:**
- `id` (number): ID de la categoría

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Productos

### GET /productos
Listar todos los productos.

**Query Parameters (opcionales):**
- `skip` (number): Número de registros a saltar
- `take` (number): Número de registros a obtener

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "descripcion": "Taladro profesional de alta potencia",
    "precio": 250.00,
    "stock": 15,
    "imagen": "https://example.com/taladro-dewalt.jpg",
    "id_categoria": 2,
    "fecha_creacion": "2025-11-01T11:00:00Z",
    "fecha_actualizacion": "2025-11-20T11:00:00Z",
    "categoria": {
      "id_categoria": 2,
      "nombre": "Taladros"
    }
  }
]
```

---

### GET /productos/search
Buscar productos por patrón de nombre (case-insensitive).

**Query Parameters:**
- `pattern` (string, **requerido**): Patrón de búsqueda

**Example:**
```
GET /productos/search?pattern=taladro
```

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "descripcion": "Taladro profesional de alta potencia",
    "precio": 250.00,
    "stock": 15,
    "imagen": "https://example.com/taladro-dewalt.jpg",
    "categoria": {
      "id_categoria": 2,
      "nombre": "Taladros"
    }
  }
]
```

**Error (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "Pattern cannot be empty"
}
```

---

### GET /productos/:id
Obtener producto por ID.

**Path Parameters:**
- `id` (number): ID del producto

**Response (200 OK):**
```json
{
  "id_producto": 1,
  "nombre": "Taladro DeWalt",
  "descripcion": "Taladro profesional de alta potencia",
  "precio": 250.00,
  "stock": 15,
  "imagen": "https://example.com/taladro-dewalt.jpg",
  "id_categoria": 2,
  "fecha_creacion": "2025-11-01T11:00:00Z",
  "fecha_actualizacion": "2025-11-20T11:00:00Z",
  "categoria": {
    "id_categoria": 2,
    "nombre": "Taladros"
  },
  "modelos": [
    {
      "id_modelo": 5,
      "nombre": "Model A 2024"
    }
  ]
}
```

---

### POST /productos
Crear nuevo producto.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "Sierra Circular",
  "descripcion": "Sierra circular profesional",
  "precio": 180.50,
  "stock": 20,
  "imagen": "https://example.com/sierra-circular.jpg",
  "id_categoria": 2
}
```

**Response (201 Created):**
```json
{
  "id_producto": 10,
  "nombre": "Sierra Circular",
  "descripcion": "Sierra circular profesional",
  "precio": 180.50,
  "stock": 20,
  "imagen": "https://example.com/sierra-circular.jpg",
  "id_categoria": 2,
  "fecha_creacion": "2025-11-20T11:30:00Z"
}
```

---

### PUT /productos/:id
Actualizar producto.

**Path Parameters:**
- `id` (number): ID del producto

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
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
  "descripcion": "Sierra circular profesional",
  "precio": 195.00,
  "stock": 18,
  "imagen": "https://example.com/sierra-circular.jpg",
  "id_categoria": 2,
  "fecha_actualizacion": "2025-11-20T11:35:00Z"
}
```

---

### DELETE /productos/:id
Eliminar producto.

**Path Parameters:**
- `id` (number): ID del producto

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Carritos

**Autenticación requerida:** JWT Token para rutas de modificación

### GET /carritos
Listar todos los carritos.

**Response (200 OK):**
```json
[
  {
    "id_carrito": 1,
    "id_cliente": 1,
    "estado": "activo",
    "fecha_creacion": "2025-11-20T12:00:00Z",
    "fecha_actualizacion": "2025-11-20T12:05:00Z",
    "cliente": {
      "id_cliente": 1,
      "nombre": "Carlos",
      "correo": "cliente@example.com"
    },
    "detalles": [
      {
        "id_detalle": 1,
        "cantidad": 2,
        "precio_unitario": 250.00,
        "subtotal": 500.00,
        "producto": {
          "id_producto": 1,
          "nombre": "Taladro DeWalt",
          "imagen_url": "https://example.com/taladro-dewalt.jpg",
          "stock": 15,
          "precio_unitario": 250.00
        }
      }
    ]
  }
]
```

---

### GET /carritos/:id
Obtener carrito por ID con detalles.

**Path Parameters:**
- `id` (number): ID del carrito

**Response (200 OK):**
```json
{
  "id_carrito": 1,
  "id_cliente": 1,
  "estado": "activo",
  "fecha_creacion": "2025-11-20T12:00:00Z",
  "cliente": {
    "id_cliente": 1,
    "nombre": "Carlos",
    "correo": "cliente@example.com"
  },
  "detalles": [
    {
      "id_detalle": 1,
      "cantidad": 2,
      "precio_unitario": 250.00,
      "subtotal": 500.00,
      "producto": {
        "id_producto": 1,
        "nombre": "Taladro DeWalt",
        "imagen_url": "https://example.com/taladro-dewalt.jpg",
        "stock": 15,
        "precio_unitario": 250.00
      }
    }
  ]
}
```

---

### POST /carritos
Crear nuevo carrito.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id_cliente": 1,
  "estado": "activo"
}
```

**Response (201 Created):**
```json
{
  "id_carrito": 2,
  "id_cliente": 1,
  "estado": "activo",
  "fecha_creacion": "2025-11-20T12:10:00Z"
}
```

---

### POST /carritos/:id/detalles
Añadir detalle (producto) al carrito.

**Path Parameters:**
- `id` (number): ID del carrito

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id_producto": 1,
  "cantidad": 2,
  "precio_unitario": 250.00
}
```

**Response (201 Created):**
```json
{
  "id_detalle": 5,
  "cantidad": 2,
  "precio_unitario": 250.00,
  "subtotal": 500.00,
  "producto": {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "imagen_url": "https://example.com/taladro-dewalt.jpg",
    "stock": 15,
    "precio_unitario": 250.00
  }
}
```

---

### GET /carritos/:id/detalles
Listar detalles del carrito.

**Path Parameters:**
- `id` (number): ID del carrito

**Response (200 OK):**
```json
[
  {
    "id_detalle": 1,
    "cantidad": 2,
    "precio_unitario": 250.00,
    "subtotal": 500.00,
    "producto": {
      "id_producto": 1,
      "nombre": "Taladro DeWalt",
      "imagen_url": "https://example.com/taladro-dewalt.jpg",
      "stock": 15,
      "precio_unitario": 250.00
    }
  }
]
```

---

### PUT /carritos/:id
Actualizar estado del carrito.

**Path Parameters:**
- `id` (number): ID del carrito

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "estado": "completado"
}
```

**Response (200 OK):**
```json
{
  "id_carrito": 1,
  "id_cliente": 1,
  "estado": "completado",
  "fecha_actualizacion": "2025-11-20T12:15:00Z"
}
```

---

### DELETE /carritos/:id
Eliminar carrito.

**Path Parameters:**
- `id` (number): ID del carrito

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

### DELETE /carritos/detalles/:id_detalle
Eliminar detalle del carrito.

**Path Parameters:**
- `id_detalle` (number): ID del detalle

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Pedidos

**Autenticación requerida:** JWT Token
**Estados posibles:** pendiente, pagado, procesando, enviado, entregado, cancelado, reembolso

### GET /pedidos
Listar todos los pedidos.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "tipo_pedido": "online",
    "estado": "pendiente",
    "total": 1200.50,
    "fecha_creacion": "2025-11-20T12:20:00Z",
    "fecha_actualizacion": "2025-11-20T12:20:00Z",
    "detalles": [
      {
        "id_detalle": 1,
        "id_pedido": 1,
        "id_producto": 1,
        "cantidad": 1,
        "precio_unitario": 250.00,
        "subtotal": 250.00,
        "producto": {
          "id_producto": 1,
          "nombre": "Taladro DeWalt",
          "precio": 250.00
        }
      }
    ]
  }
]
```

---

### GET /pedidos/:id
Obtener pedido por ID con detalles.

**Path Parameters:**
- `id` (number): ID del pedido

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id_pedido": 1,
  "id_usuario": 1,
  "tipo_pedido": "online",
  "estado": "pendiente",
  "total": 1200.50,
  "fecha_creacion": "2025-11-20T12:20:00Z",
  "detalles": [
    {
      "id_detalle": 1,
      "id_pedido": 1,
      "id_producto": 1,
      "cantidad": 1,
      "precio_unitario": 250.00,
      "subtotal": 250.00,
      "producto": {
        "id_producto": 1,
        "nombre": "Taladro DeWalt",
        "precio": 250.00
      }
    },
    {
      "id_detalle": 2,
      "id_pedido": 1,
      "id_producto": 5,
      "cantidad": 2,
      "precio_unitario": 475.25,
      "subtotal": 950.50,
      "producto": {
        "id_producto": 5,
        "nombre": "Sierra Circular",
        "precio": 475.25
      }
    }
  ]
}
```

---

### POST /pedidos
Crear nuevo pedido con detalles.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id_usuario": 1,
  "tipo_pedido": "online",
  "detalles": [
    {
      "id_producto": 1,
      "cantidad": 1,
      "precio_unitario": 250.00
    },
    {
      "id_producto": 5,
      "cantidad": 2,
      "precio_unitario": 475.25
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id_pedido": 5,
  "id_usuario": 1,
  "tipo_pedido": "online",
  "estado": "pendiente",
  "total": 1200.50,
  "fecha_creacion": "2025-11-20T12:25:00Z",
  "detalles": [
    {
      "id_detalle": 10,
      "cantidad": 1,
      "precio_unitario": 250.00,
      "subtotal": 250.00
    },
    {
      "id_detalle": 11,
      "cantidad": 2,
      "precio_unitario": 475.25,
      "subtotal": 950.50
    }
  ]
}
```

---

### PUT /pedidos/:id
Actualizar estado del pedido.

**Path Parameters:**
- `id` (number): ID del pedido

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "estado": "pagado"
}
```

**Response (200 OK):**
```json
{
  "id_pedido": 1,
  "id_usuario": 1,
  "tipo_pedido": "online",
  "estado": "pagado",
  "total": 1200.50,
  "fecha_actualizacion": "2025-11-20T12:30:00Z"
}
```

---

### DELETE /pedidos/:id
Eliminar pedido.

**Path Parameters:**
- `id` (number): ID del pedido

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Comprobantes

**Autenticación requerida:** JWT Token

### GET /comprobantes
Listar todos los comprobantes.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id_comprobante": 1,
    "id_pedido": 1,
    "id_cliente": 1,
    "tipo_comprobante": "factura",
    "numero_comprobante": "F001-000001",
    "total": 1200.50,
    "metodo_pago": "tarjeta",
    "fecha_creacion": "2025-11-20T12:35:00Z",
    "fecha_actualizacion": "2025-11-20T12:35:00Z"
  }
]
```

---

### GET /comprobantes/:id
Obtener comprobante por ID.

**Path Parameters:**
- `id` (number): ID del comprobante

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id_comprobante": 1,
  "id_pedido": 1,
  "id_cliente": 1,
  "tipo_comprobante": "factura",
  "numero_comprobante": "F001-000001",
  "total": 1200.50,
  "metodo_pago": "tarjeta",
  "fecha_creacion": "2025-11-20T12:35:00Z",
  "fecha_actualizacion": "2025-11-20T12:35:00Z"
}
```

---

### POST /comprobantes
Crear nuevo comprobante.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id_pedido": 1,
  "id_cliente": 1,
  "tipo_comprobante": "factura",
  "numero_comprobante": "F001-000001",
  "total": 1200.50,
  "metodo_pago": "tarjeta"
}
```

**Response (201 Created):**
```json
{
  "id_comprobante": 1,
  "id_pedido": 1,
  "id_cliente": 1,
  "tipo_comprobante": "factura",
  "numero_comprobante": "F001-000001",
  "total": 1200.50,
  "metodo_pago": "tarjeta",
  "fecha_creacion": "2025-11-20T12:35:00Z"
}
```

---

### DELETE /comprobantes/:id
Eliminar comprobante.

**Path Parameters:**
- `id` (number): ID del comprobante

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Reportes

**Autenticación requerida:** JWT Token
**Roles permitidos:** `superadmin`, `vendedor`

### GET /reportes/ventas/totales
Obtener ventas totales en un rango de fechas.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601): Fecha inicial (ej: 2025-01-01)
- `hasta` (string, ISO 8601): Fecha final (ej: 2025-11-20)

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /reportes/ventas/totales?desde=2025-01-01&hasta=2025-11-20
```

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

### GET /reportes/ventas/por-producto
Obtener ventas agrupadas por producto.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601): Fecha inicial
- `hasta` (string, ISO 8601): Fecha final

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /reportes/ventas/por-producto?desde=2025-01-01&hasta=2025-11-20
```

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre_producto": "Taladro DeWalt",
    "cantidad_vendida": 5,
    "ingresos_totales": 1250.00,
    "precio_promedio": 250.00
  },
  {
    "id_producto": 5,
    "nombre_producto": "Sierra Circular",
    "cantidad_vendida": 8,
    "ingresos_totales": 3802.00,
    "precio_promedio": 475.25
  }
]
```

---

### GET /reportes/pedidos/por-dia
Obtener cantidad de pedidos por día.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601): Fecha inicial
- `hasta` (string, ISO 8601): Fecha final

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /reportes/pedidos/por-dia?desde=2025-11-01&hasta=2025-11-20
```

**Response (200 OK):**
```json
[
  {
    "fecha": "2025-11-01",
    "cantidad_pedidos": 3,
    "monto_total": 2500.00
  },
  {
    "fecha": "2025-11-02",
    "cantidad_pedidos": 2,
    "monto_total": 1800.50
  },
  {
    "fecha": "2025-11-20",
    "cantidad_pedidos": 1,
    "monto_total": 1200.50
  }
]
```

---

### GET /reportes/clientes/top
Obtener clientes con más compras (top clientes).

**Query Parameters (opcionales):**
- `limit` (number): Número máximo de clientes a retornar (default: 10)

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /reportes/clientes/top?limit=5
```

**Response (200 OK):**
```json
[
  {
    "id_cliente": 1,
    "nombre_cliente": "Carlos García",
    "correo": "cliente@example.com",
    "cantidad_pedidos": 8,
    "monto_total_gastado": 5200.75
  },
  {
    "id_cliente": 3,
    "nombre_cliente": "Ana Rodríguez",
    "correo": "ana@example.com",
    "cantidad_pedidos": 5,
    "monto_total_gastado": 3100.00
  }
]
```

---

### GET /reportes/stock/bajo
Obtener productos con stock bajo (por debajo de umbral).

**Query Parameters (opcionales):**
- `threshold` (number): Umbral mínimo de stock (default: 10)

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /reportes/stock/bajo?threshold=10
```

**Response (200 OK):**
```json
[
  {
    "id_producto": 2,
    "nombre": "Destornillador Phillips",
    "stock_actual": 3,
    "precio": 15.50,
    "id_categoria": 1,
    "nombre_categoria": "Herramientas"
  },
  {
    "id_producto": 8,
    "nombre": "Cinta Métrica",
    "stock_actual": 5,
    "precio": 12.00,
    "id_categoria": 1,
    "nombre_categoria": "Herramientas"
  }
]
```

---

## Marcas de Vehículos

### GET /marcas
Listar todas las marcas de vehículos.

**Response (200 OK):**
```json
[
  {
    "id_marca": 1,
    "nombre": "Toyota",
    "fecha_creacion": "2025-11-01T13:00:00Z",
    "fecha_actualizacion": "2025-11-20T13:00:00Z",
    "modelos": [
      {
        "id_modelo": 5,
        "nombre": "Corolla"
      },
      {
        "id_modelo": 6,
        "nombre": "RAV4"
      }
    ]
  },
  {
    "id_marca": 2,
    "nombre": "Ford",
    "fecha_creacion": "2025-11-02T13:00:00Z",
    "modelos": []
  }
]
```

---

### GET /marcas/:id
Obtener marca por ID.

**Path Parameters:**
- `id` (number): ID de la marca

**Response (200 OK):**
```json
{
  "id_marca": 1,
  "nombre": "Toyota",
  "fecha_creacion": "2025-11-01T13:00:00Z",
  "fecha_actualizacion": "2025-11-20T13:00:00Z",
  "modelos": [
    {
      "id_modelo": 5,
      "nombre": "Corolla"
    },
    {
      "id_modelo": 6,
      "nombre": "RAV4"
    }
  ]
}
```

---

### POST /marcas
Crear nueva marca de vehículo.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "BMW"
}
```

**Response (201 Created):**
```json
{
  "id_marca": 3,
  "nombre": "BMW",
  "fecha_creacion": "2025-11-20T13:10:00Z"
}
```

---

### PUT /marcas/:id
Actualizar marca.

**Path Parameters:**
- `id` (number): ID de la marca

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "BMW Premium"
}
```

**Response (200 OK):**
```json
{
  "id_marca": 3,
  "nombre": "BMW Premium",
  "fecha_actualizacion": "2025-11-20T13:15:00Z"
}
```

---

### DELETE /marcas/:id
Eliminar marca.

**Path Parameters:**
- `id` (number): ID de la marca

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Modelos de Vehículos

### GET /modelos
Listar todos los modelos de vehículos.

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Corolla",
    "id_marca": 1,
    "fecha_creacion": "2025-11-01T13:30:00Z",
    "fecha_actualizacion": "2025-11-20T13:30:00Z",
    "marca": {
      "id_marca": 1,
      "nombre": "Toyota"
    },
    "productos": [
      {
        "id_producto": 1,
        "nombre": "Taladro DeWalt"
      }
    ]
  }
]
```

---

### GET /modelos/marca/:id_marca
Obtener todos los modelos de una marca específica.

**Path Parameters:**
- `id_marca` (number): ID de la marca

**Response (200 OK):**
```json
[
  {
    "id_modelo": 5,
    "nombre": "Corolla",
    "marca": {
      "id_marca": 1,
      "nombre": "Toyota"
    },
    "productoModelos": [
      {
        "id_producto": 1,
        "id_modelo": 5
      }
    ]
  }
]
```

---

### GET /modelos/:id
Obtener modelo por ID.

**Path Parameters:**
- `id` (number): ID del modelo

**Response (200 OK):**
```json
{
  "id_modelo": 1,
  "nombre": "Corolla",
  "id_marca": 1,
  "fecha_creacion": "2025-11-01T13:30:00Z",
  "fecha_actualizacion": "2025-11-20T13:30:00Z",
  "marca": {
    "id_marca": 1,
    "nombre": "Toyota"
  },
  "productos": [
    {
      "id_producto": 1,
      "nombre": "Taladro DeWalt",
      "precio": 250.00
    }
  ]
}
```

---

### POST /modelos
Crear nuevo modelo de vehículo.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "3 Series",
  "id_marca": 3
}
```

**Response (201 Created):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series",
  "id_marca": 3,
  "fecha_creacion": "2025-11-20T13:40:00Z"
}
```

---

### PUT /modelos/:id
Actualizar modelo.

**Path Parameters:**
- `id` (number): ID del modelo

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "3 Series 2024"
}
```

**Response (200 OK):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series 2024",
  "id_marca": 3,
  "fecha_actualizacion": "2025-11-20T13:45:00Z"
}
```

---

### DELETE /modelos/:id
Eliminar modelo.

**Path Parameters:**
- `id` (number): ID del modelo

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Asignación Producto-Modelo

### POST /producto-modelos
Asignar un producto a un modelo de vehículo.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
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

### GET /producto-modelos
Listar todas las asignaciones producto-modelo.

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "id_modelo": 5,
    "fecha_creacion": "2025-11-20T13:50:00Z",
    "producto": {
      "id_producto": 1,
      "nombre": "Taladro DeWalt",
      "precio": 250.00
    },
    "modelo": {
      "id_modelo": 5,
      "nombre": "Corolla",
      "marca": {
        "id_marca": 1,
        "nombre": "Toyota"
      }
    }
  }
]
```

---

### GET /producto-modelos/producto/:id_producto
Obtener todos los modelos asociados a un producto.

**Path Parameters:**
- `id_producto` (number): ID del producto

**Response (200 OK):**
```json
[
  {
    "id_modelo": 5,
    "nombre": "Corolla",
    "marca": {
      "id_marca": 1,
      "nombre": "Toyota"
    }
  },
  {
    "id_modelo": 6,
    "nombre": "RAV4",
    "marca": {
      "id_marca": 1,
      "nombre": "Toyota"
    }
  }
]
```

---

### GET /producto-modelos/modelo/:id_modelo
Obtener todos los productos asociados a un modelo.

**Path Parameters:**
- `id_modelo` (number): ID del modelo

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "descripcion": "Taladro profesional de alta potencia",
    "precio": 250.00,
    "stock": 15
  },
  {
    "id_producto": 5,
    "nombre": "Sierra Circular",
    "descripcion": "Sierra circular profesional",
    "precio": 475.25,
    "stock": 20
  }
]
```

---

### GET /producto-modelos/:id_producto/:id_modelo
Obtener una asignación específica producto-modelo.

**Path Parameters:**
- `id_producto` (number): ID del producto
- `id_modelo` (number): ID del modelo

**Response (200 OK):**
```json
{
  "id_producto": 1,
  "id_modelo": 5,
  "fecha_creacion": "2025-11-20T13:50:00Z",
  "producto": {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "precio": 250.00
  },
  "modelo": {
    "id_modelo": 5,
    "nombre": "Corolla"
  }
}
```

---

### PUT /producto-modelos/:id_producto/:id_modelo
Actualizar asignación producto-modelo.

**Path Parameters:**
- `id_producto` (number): ID del producto
- `id_modelo` (number): ID del modelo

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "id_modelo": 6
}
```

**Response (200 OK):**
```json
{
  "id_producto": 1,
  "id_modelo": 6,
  "fecha_actualizacion": "2025-11-20T14:00:00Z"
}
```

---

### DELETE /producto-modelos/:id_producto/:id_modelo
Desasignar un producto de un modelo.

**Path Parameters:**
- `id_producto` (number): ID del producto
- `id_modelo` (number): ID del modelo

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
```
(sin cuerpo)
```

---

## Notas de Seguridad y Autenticación

### Headers requeridos para rutas protegidas
```
Authorization: Bearer <JWT_TOKEN>
```

### Roles y permisos
- **superadmin**: Acceso completo a todas las rutas (CRUD en administradores, reportes, etc).
- **vendedor**: Acceso a reportes y lectura de productos/categorías.
- **cliente**: Acceso a carritos, pedidos, comprobantes propios.

### Variables de entorno requeridas
```bash
JWT_SECRET=tu_secreto_aqui
DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASS=password
DB_NAME=autotecnicar_db
```

### Códigos de estado HTTP comunes
- **200 OK**: Solicitud exitosa.
- **201 Created**: Recurso creado exitosamente.
- **204 No Content**: Operación exitosa sin contenido de retorno.
- **400 Bad Request**: Solicitud inválida (parámetros faltantes o incorrectos).
- **401 Unauthorized**: Falta autenticación o token inválido.
- **403 Forbidden**: Permisos insuficientes.
- **404 Not Found**: Recurso no encontrado.
- **500 Internal Server Error**: Error del servidor.

---

## Ejemplos de uso con cURL (PowerShell)

### Registrar cliente
```powershell
curl -Method POST -Body (ConvertTo-Json @{ correo='cliente@x.com'; password='pass123'; nombre='Juan' }) -ContentType 'application/json' http://localhost:3000/auth/cliente/register
```

### Login cliente
```powershell
$response = curl -Method POST -Body (ConvertTo-Json @{ correo='cliente@x.com'; password='pass123' }) -ContentType 'application/json' http://localhost:3000/auth/cliente/login | ConvertFrom-Json
$token = $response.access_token
```

### Acceder a ruta protegida
```powershell
curl -Headers @{ 'Authorization' = "Bearer $token" } http://localhost:3000/reportes/ventas/totales
```

### Crear producto
```powershell
curl -Method POST -Body (ConvertTo-Json @{ nombre='Producto'; descripcion='Desc'; precio=100; stock=50; id_categoria=1 }) -ContentType 'application/json' -Headers @{ 'Authorization' = "Bearer $token" } http://localhost:3000/productos
```

---

**Última actualización:** 20 de noviembre de 2025
**Versión de API:** 1.0.0