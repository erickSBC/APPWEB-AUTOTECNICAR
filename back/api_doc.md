# API Documentation - AutoTecnicar E-Commerce Backend

**Versión:** 1.0.0  
**Base URL:** http://localhost:3000  
**Última actualización:** 24 de noviembre de 2025

---

## Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Clientes](#clientes)
3. [Administradores](#administradores)
4. [Categorías](#categorías)
5. [Productos](#productos)
6. [Carritos](#carritos)
7. [Detalles de Carrito](#detalles-de-carrito)
8. [Pedidos](#pedidos)
9. [Comprobantes](#comprobantes)
10. [Reportes](#reportes)
11. [Modelos de Vehículos](#modelos-de-vehículos)
12. [Producto-Modelo](#producto-modelo)
13. [Documentación](#documentación)

---

## Autenticación

### POST /auth/admin/register
Registra un nuevo administrador en el sistema.

**Request Body:**
```json
{
  "correo": "admin@example.com",
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
    "correo": "admin@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "superadmin",
    "telefono": "+34912345678",
    "direccion": "Calle Principal 123",
    "fecha_creacion": "2025-11-24T10:30:00Z"
  }
}
```

**Errores:**
- `400 Bad Request` - Datos inválidos o correo ya existe
- `500 Internal Server Error` - Error del servidor

---

### POST /auth/admin/login
Autentica un administrador y retorna un JWT token.

**Request Body:**
```json
{
  "correo": "admin@example.com",
  "password": "securePass123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**
- `401 Unauthorized` - Credenciales inválidas
- `404 Not Found` - Administrador no existe

---

### POST /auth/cliente/register
Registra un nuevo cliente en el sistema.

**Request Body:**
```json
{
  "correo": "cliente@example.com",
  "password": "securePass123",
  "nombre": "Carlos",
  "apellido": "García",
  "telefono": "+34912345678",
  "direccion": "Avenida Secundaria 456",
  "dni": "12345678A"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "cliente": {
    "id_cliente": 1,
    "correo": "cliente@example.com",
    "nombre": "Carlos",
    "apellido": "García",
    "telefono": "+34912345678",
    "direccion": "Avenida Secundaria 456",
    "dni": "12345678A",
    "fecha_creacion": "2025-11-24T10:35:00Z"
  }
}
```

**Notas:**
- Si no se proporciona password, se asigna uno por defecto hasheado
- El campo `dni` es opcional

---

### POST /auth/cliente/login
Autentica un cliente y retorna un JWT token.

**Request Body:**
```json
{
  "correo": "cliente@example.com",
  "password": "securePass123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**
- `401 Unauthorized` - Credenciales inválidas
- `404 Not Found` - Cliente no existe

---

## Clientes

### GET /clientes
Obtiene la lista completa de clientes.

**Query Parameters (opcionales):**
- `skip` (number) - Registros a saltar (default: 0)
- `take` (number) - Registros a obtener (default: 10)

**Response (200 OK):**
```json
[
  {
    "id_cliente": 1,
    "nombre": "Carlos",
    "apellido": "García",
    "correo": "cliente@example.com",
    "telefono": "+34912345678",
    "dni": "12345678A",
    "direccion": "Avenida Secundaria 456",
    "fecha_creacion": "2025-11-01T09:00:00Z",
    "fecha_actualizacion": "2025-11-24T10:35:00Z"
  },
  {
    "id_cliente": 2,
    "nombre": "Pedro",
    "apellido": "Sánchez",
    "correo": "pedro@example.com",
    "telefono": "+34934567890",
    "dni": "87654321B",
    "direccion": "Plaza Mayor 10",
    "fecha_creacion": "2025-11-02T09:00:00Z",
    "fecha_actualizacion": "2025-11-24T10:35:00Z"
  }
]
```

---

### GET /clientes/:id
Obtiene un cliente específico por su ID.

**Path Parameters:**
- `id` (number) - ID del cliente

**Response (200 OK):**
```json
{
  "id_cliente": 1,
  "nombre": "Carlos",
  "apellido": "García",
  "correo": "cliente@example.com",
  "telefono": "+34912345678",
  "dni": "12345678A",
  "direccion": "Avenida Secundaria 456",
  "fecha_creacion": "2025-11-01T09:00:00Z",
  "fecha_actualizacion": "2025-11-24T10:35:00Z"
}
```

**Errores:**
- `404 Not Found` - Cliente no existe

---

### POST /clientes
Crea un nuevo cliente.

**Request Body:**
```json
{
  "correo": "newcliente@example.com",
  "nombre": "Pedro",
  "apellido": "Sánchez",
  "telefono": "+34934567890",
  "direccion": "Plaza Mayor 10",
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
  "telefono": "+34934567890",
  "dni": "87654321B",
  "direccion": "Plaza Mayor 10",
  "fecha_creacion": "2025-11-24T11:10:00Z"
}
```

**Notas:**
- Si no se proporciona password, se asigna uno por defecto
- El campo `dni` es opcional
- El campo `password` es opcional

---

### PUT /clientes/:id
Actualiza la información de un cliente.

**Path Parameters:**
- `id` (number) - ID del cliente

**Request Body (todos los campos opcionales):**
```json
{
  "nombre": "Pedro Updated",
  "telefono": "+34912121212",
  "dni": "87654321B",
  "password": "newPassword123"
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
  "dni": "87654321B",
  "direccion": "Plaza Mayor 10",
  "fecha_actualizacion": "2025-11-24T11:15:00Z"
}
```

**Notas:**
- Si se proporciona password, será hasheado antes de guardarse
- Todos los campos son opcionales

---

### DELETE /clientes/:id
Elimina un cliente del sistema.

**Path Parameters:**
- `id` (number) - ID del cliente

**Response (204 No Content)**

---

## Administradores

### GET /administradores
Obtiene la lista de administradores.

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
    "fecha_actualizacion": "2025-11-24T10:30:00Z"
  }
]
```

---

### GET /administradores/:id
Obtiene un administrador específico.

**Path Parameters:**
- `id` (number) - ID del administrador

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
  "fecha_actualizacion": "2025-11-24T10:30:00Z"
}
```

---

### POST /administradores
Crea un nuevo administrador.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T10:40:00Z"
}
```

**Roles válidos:** `superadmin`, `vendedor`

---

### PUT /administradores/:id
Actualiza un administrador.

**Path Parameters:**
- `id` (number) - ID del administrador

**Request Body:**
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
  "fecha_actualizacion": "2025-11-24T11:00:00Z"
}
```

---

### DELETE /administradores/:id
Elimina un administrador.

**Path Parameters:**
- `id` (number) - ID del administrador

**Response (204 No Content)**

---

## Categorías

### GET /categorias
Obtiene la lista de categorías.

**Query Parameters (opcionales):**
- `skip` (number) - Registros a saltar
- `take` (number) - Registros a obtener

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
    "fecha_actualizacion": "2025-11-24T10:50:00Z"
  },
  {
    "id_categoria": 2,
    "nombre": "Taladros",
    "descripcion": "Taladros eléctricos diversos",
    "imagen": "https://example.com/taladros.jpg",
    "id_padre": 1,
    "fecha_creacion": "2025-11-02T10:00:00Z",
    "fecha_actualizacion": "2025-11-24T10:50:00Z"
  }
]
```

---

### GET /categorias/:id
Obtiene una categoría específica con sus productos e hijos.

**Path Parameters:**
- `id` (number) - ID de la categoría

**Response (200 OK):**
```json
{
  "id_categoria": 1,
  "nombre": "Herramientas",
  "descripcion": "Herramientas de mano y eléctricas",
  "imagen": "https://example.com/herramientas.jpg",
  "id_padre": null,
  "fecha_creacion": "2025-11-01T10:00:00Z",
  "fecha_actualizacion": "2025-11-24T10:50:00Z",
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
Crea una nueva categoría.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T11:20:00Z"
}
```

---

### PUT /categorias/:id
Actualiza una categoría.

**Path Parameters:**
- `id` (number) - ID de la categoría

**Request Body:**
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
  "fecha_actualizacion": "2025-11-24T11:25:00Z"
}
```

---

### DELETE /categorias/:id
Elimina una categoría.

**Path Parameters:**
- `id` (number) - ID de la categoría

**Response (204 No Content)**

---

## Productos

### GET /productos
Obtiene la lista de productos.

**Query Parameters (opcionales):**
- `skip` (number) - Registros a saltar
- `take` (number) - Registros a obtener

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
    "fecha_actualizacion": "2025-11-24T11:00:00Z",
    "categoria": {
      "id_categoria": 2,
      "nombre": "Taladros"
    }
  }
]
```

---

### GET /productos/search?pattern=
Busca productos por patrón de nombre (case-insensitive).

**Query Parameters:**
- `pattern` (string, **requerido**) - Patrón de búsqueda

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

**Errores:**
- `400 Bad Request` - Pattern vacío o no proporcionado

---

### GET /productos/:id
Obtiene un producto específico con sus modelos asociados.

**Path Parameters:**
- `id` (number) - ID del producto

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
  "fecha_actualizacion": "2025-11-24T11:00:00Z",
  "categoria": {
    "id_categoria": 2,
    "nombre": "Taladros"
  },
  "productoModelos": [
    {
      "id_producto": 1,
      "id_modelo": 5,
      "modelo": {
        "id_modelo": 5,
        "nombre": "Corolla 2020",
        "marca": "Toyota"
      }
    }
  ]
}
```

---

### POST /productos
Crea un nuevo producto.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T11:30:00Z"
}
```

---

### PUT /productos/:id
Actualiza un producto.

**Path Parameters:**
- `id` (number) - ID del producto

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
  "descripcion": "Sierra circular profesional",
  "precio": 195.00,
  "stock": 18,
  "imagen": "https://example.com/sierra-circular.jpg",
  "id_categoria": 2,
  "fecha_actualizacion": "2025-11-24T11:35:00Z"
}
```

---

### DELETE /productos/:id
Elimina un producto.

**Path Parameters:**
- `id` (number) - ID del producto

**Response (204 No Content)**

---

## Carritos

### GET /carritos
Obtiene la lista de carritos.

**Response (200 OK):**
```json
[
  {
    "id_carrito": 1,
    "id_cliente": 1,
    "estado": "activo",
    "fecha_creacion": "2025-11-24T12:00:00Z",
    "fecha_actualizacion": "2025-11-24T12:05:00Z",
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
          "stock": 15
        }
      }
    ]
  }
]
```

---

### GET /carritos/:id
Obtiene un carrito específico con sus detalles.

**Path Parameters:**
- `id` (number) - ID del carrito

**Response (200 OK):**
```json
{
  "id_carrito": 1,
  "id_cliente": 1,
  "estado": "activo",
  "fecha_creacion": "2025-11-24T12:00:00Z",
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
        "stock": 15
      }
    }
  ]
}
```

---

### POST /carritos
Crea un nuevo carrito.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T12:10:00Z"
}
```

---

### PUT /carritos/:id
Actualiza el estado de un carrito.

**Path Parameters:**
- `id` (number) - ID del carrito

**Request Body:**
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
  "fecha_actualizacion": "2025-11-24T12:15:00Z"
}
```

---

### DELETE /carritos/:id
Elimina un carrito.

**Path Parameters:**
- `id` (number) - ID del carrito

**Response (204 No Content)**

---

## Detalles de Carrito

### POST /carritos/:id/detalles
Añade un producto al carrito.

**Path Parameters:**
- `id` (number) - ID del carrito

**Request Body:**
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
  "id_carrito": 1,
  "id_producto": 1,
  "cantidad": 2,
  "precio_unitario": 250.00,
  "subtotal": 500.00,
  "producto": {
    "id_producto": 1,
    "nombre": "Taladro DeWalt",
    "stock": 15
  }
}
```

---

### GET /carritos/:id/detalles
Obtiene los detalles del carrito.

**Path Parameters:**
- `id` (number) - ID del carrito

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
      "stock": 15
    }
  }
]
```

---

### DELETE /carritos/detalles/:id_detalle
Elimina un producto del carrito.

**Path Parameters:**
- `id_detalle` (number) - ID del detalle

**Response (204 No Content)**

---

## Pedidos

### GET /pedidos
Obtiene la lista de pedidos.

**Response (200 OK):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "tipo_pedido": "online",
    "estado": "pendiente",
    "total": 1200.50,
    "fecha_creacion": "2025-11-24T12:20:00Z",
    "fecha_actualizacion": "2025-11-24T12:20:00Z",
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
          "nombre": "Taladro DeWalt"
        }
      }
    ]
  }
]
```

---

### GET /pedidos/:id
Obtiene un pedido específico con sus detalles.

**Path Parameters:**
- `id` (number) - ID del pedido

**Response (200 OK):**
```json
{
  "id_pedido": 1,
  "id_usuario": 1,
  "tipo_pedido": "online",
  "estado": "pendiente",
  "total": 1200.50,
  "fecha_creacion": "2025-11-24T12:20:00Z",
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
        "nombre": "Taladro DeWalt"
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
        "nombre": "Sierra Circular"
      }
    }
  ]
}
```

---

### POST /pedidos
Crea un nuevo pedido con detalles.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T12:25:00Z",
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
Actualiza el estado del pedido.

**Path Parameters:**
- `id` (number) - ID del pedido

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
  "id_usuario": 1,
  "tipo_pedido": "online",
  "estado": "pagado",
  "total": 1200.50,
  "fecha_actualizacion": "2025-11-24T12:30:00Z"
}
```

**Estados válidos:**
- `pendiente`
- `pagado`
- `procesando`
- `enviado`
- `entregado`
- `cancelado`
- `reembolso`

---

### DELETE /pedidos/:id
Elimina un pedido.

**Path Parameters:**
- `id` (number) - ID del pedido

**Response (204 No Content)**

---

## Comprobantes

### GET /comprobantes
Obtiene la lista de comprobantes.

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
    "fecha_creacion": "2025-11-24T12:35:00Z",
    "fecha_actualizacion": "2025-11-24T12:35:00Z"
  }
]
```

---

### GET /comprobantes/:id
Obtiene un comprobante específico.

**Path Parameters:**
- `id` (number) - ID del comprobante

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
  "fecha_creacion": "2025-11-24T12:35:00Z",
  "fecha_actualizacion": "2025-11-24T12:35:00Z"
}
```

---

### POST /comprobantes
Crea un nuevo comprobante.

**Request Body:**
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
  "fecha_creacion": "2025-11-24T12:35:00Z"
}
```

---

### DELETE /comprobantes/:id
Elimina un comprobante.

**Path Parameters:**
- `id` (number) - ID del comprobante

**Response (204 No Content)**

---

## Reportes

### GET /reportes/ventas/totales
Obtiene ventas totales en un rango de fechas.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601) - Fecha inicial (ej: 2025-01-01)
- `hasta` (string, ISO 8601) - Fecha final (ej: 2025-11-24)

**Response (200 OK):**
```json
{
  "total_ventas": 15650.75,
  "cantidad_pedidos": 12,
  "periodo": {
    "desde": "2025-01-01",
    "hasta": "2025-11-24"
  }
}
```

---

### GET /reportes/ventas/por-producto
Obtiene ventas agrupadas por producto.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601) - Fecha inicial
- `hasta` (string, ISO 8601) - Fecha final

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
Obtiene cantidad de pedidos por día.

**Query Parameters (opcionales):**
- `desde` (string, ISO 8601) - Fecha inicial
- `hasta` (string, ISO 8601) - Fecha final

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
    "fecha": "2025-11-24",
    "cantidad_pedidos": 1,
    "monto_total": 1200.50
  }
]
```

---

### GET /reportes/clientes/top
Obtiene clientes con más compras (top clientes).

**Query Parameters (opcionales):**
- `limit` (number) - Número máximo de clientes (default: 10)

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
Obtiene productos con stock bajo.

**Query Parameters (opcionales):**
- `threshold` (number) - Umbral mínimo de stock (default: 10)

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

## Modelos de Vehículos

### GET /modelos
Obtiene la lista de modelos de vehículos.

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Corolla 2020",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-01T13:30:00Z",
    "fecha_actualizacion": "2025-11-24T13:30:00Z",
    "productoModelos": [
      {
        "id_producto": 1,
        "id_modelo": 1
      }
    ]
  }
]
```

---

### GET /modelos/:id
Obtiene un modelo específico con sus productos.

**Path Parameters:**
- `id` (number) - ID del modelo

**Response (200 OK):**
```json
{
  "id_modelo": 1,
  "nombre": "Corolla 2020",
  "marca": "Toyota",
  "fecha_creacion": "2025-11-01T13:30:00Z",
  "fecha_actualizacion": "2025-11-24T13:30:00Z",
  "productoModelos": [
    {
      "id_producto": 1,
      "id_modelo": 1,
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

### GET /modelos/marca/:marca
Obtiene modelos por marca (soporta una o varias separadas por coma).

**Path Parameters:**
- `marca` (string) - Marca del vehículo (ej: "Toyota" o "Toyota,Ford,BMW")

**Ejemplos:**
```
GET /modelos/marca/Toyota
GET /modelos/marca/toyota
GET /modelos/marca/Toyota,Ford,Honda
```

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Corolla 2020",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-01T13:30:00Z",
    "fecha_actualizacion": "2025-11-24T13:30:00Z"
  },
  {
    "id_modelo": 5,
    "nombre": "RAV4 2021",
    "marca": "Toyota",
    "fecha_creacion": "2025-11-05T13:30:00Z",
    "fecha_actualizacion": "2025-11-24T13:30:00Z"
  }
]
```

**Notas:**
- Búsqueda case-insensitive
- Acepta una marca: `/modelos/marca/Toyota`
- Acepta múltiples marcas: `/modelos/marca/Toyota,Ford,BMW`

---

### POST /modelos
Crea un nuevo modelo de vehículo.

**Request Body:**
```json
{
  "nombre": "3 Series 2024",
  "marca": "BMW"
}
```

**Response (201 Created):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series 2024",
  "marca": "BMW",
  "fecha_creacion": "2025-11-24T13:40:00Z"
}
```

---

### PUT /modelos/:id
Actualiza un modelo.

**Path Parameters:**
- `id` (number) - ID del modelo

**Request Body:**
```json
{
  "nombre": "3 Series 2024 Updated",
  "marca": "BMW"
}
```

**Response (200 OK):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series 2024 Updated",
  "marca": "BMW",
  "fecha_actualizacion": "2025-11-24T13:45:00Z"
}
```

---

### DELETE /modelos/:id
Elimina un modelo.

**Path Parameters:**
- `id` (number) - ID del modelo

**Response (204 No Content)**

---

## Producto-Modelo

### POST /producto-modelos
Asigna un producto a un modelo de vehículo.

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
  "fecha_creacion": "2025-11-24T13:50:00Z"
}
```

---

### GET /producto-modelos
Obtiene todas las asignaciones producto-modelo.

**Response (200 OK):**
```json
[
  {
    "id_producto": 1,
    "id_modelo": 5,
    "fecha_creacion": "2025-11-24T13:50:00Z",
    "producto": {
      "id_producto": 1,
      "nombre": "Taladro DeWalt",
      "precio": 250.00
    },
    "modelo": {
      "id_modelo": 5,
      "nombre": "Corolla 2020",
      "marca": "Toyota"
    }
  }
]
```

---

### GET /producto-modelos/producto/:id_producto
Obtiene todos los modelos asociados a un producto.

**Path Parameters:**
- `id_producto` (number) - ID del producto

**Response (200 OK):**
```json
[
  {
    "id_modelo": 5,
    "nombre": "Corolla 2020",
    "marca": "Toyota"
  },
  {
    "id_modelo": 6,
    "nombre": "RAV4 2021",
    "marca": "Toyota"
  }
]
```

---

### GET /producto-modelos/modelo/:id_modelo
Obtiene todos los productos asociados a un modelo.

**Path Parameters:**
- `id_modelo` (number) - ID del modelo

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

### DELETE /producto-modelos/:id_producto/:id_modelo
Desasigna un producto de un modelo.

**Path Parameters:**
- `id_producto` (number) - ID del producto
- `id_modelo` (number) - ID del modelo

**Response (204 No Content)**

---

## Documentación

### GET /docs
Sirve la documentación de API en formato HTML (markdown renderizado).

**Response:** Página HTML con documentación formateada

---

### GET /docs/raw
Devuelve la documentación en formato Markdown crudo.

**Response:** Archivo Markdown (Content-Type: text/markdown)

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 204 | No Content - Operación exitosa sin contenido |
| 400 | Bad Request - Solicitud inválida o parámetros faltantes |
| 401 | Unauthorized - Sin autenticación o token inválido |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Estructura de Respuestas

### Respuesta Exitosa (GET/POST/PUT)
```json
{
  "id": 1,
  "field": "value",
  "fecha_creacion": "2025-11-24T10:30:00Z",
  "fecha_actualizacion": "2025-11-24T10:35:00Z"
}
```

### Respuesta de Error
```json
{
  "statusCode": 400,
  "message": "Descripción del error",
  "error": "Bad Request"
}
```

### Respuesta Exitosa (DELETE)
```
204 No Content
(sin cuerpo)
```

---

## Notas Importantes

### Autenticación
- Los endpoints que requieren autenticación deben incluir el JWT token en el header: `Authorization: Bearer <token>`
- Los tokens se obtienen mediante los endpoints de login (`/auth/admin/login` o `/auth/cliente/login`)

### Validaciones
- El campo `dni` en clientes es opcional
- Si no se proporciona password al crear cliente, se asigna uno por defecto hasheado
- Las búsquedas de productos y modelos son case-insensitive
- El endpoint `/modelos/marca/:marca` acepta búsquedas parciales

### Paginación
- Algunos endpoints soportan `skip` y `take` para paginación
- El valor por defecto de `take` es 10 registros

### Fechas
- Todas las fechas se devuelven en formato ISO 8601 (UTC)
- Ej: `2025-11-24T13:50:00Z`

---

**Última actualización:** 24 de noviembre de 2025  
**Versión de API:** 1.0.0  
**Base URL:** http://localhost:3000