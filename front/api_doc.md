# API Endpoints Documentation - AutoTecnicar 
**Base URL:** http://154.38.160.251/api
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
11. [Modelos de Vehículos](#modelos-de-vehículos)
12. [Producto-Modelo](#producto-modelo)

---

## Autenticación

### Login
- **Método:** `POST`
- **Ruta:** `/auth/login`
- **Descripción:** Autentica un administrador o Cliente y retorna un JWT token

**Request Body:**
```json
{
  "correo": "gustavo@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
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
  "password": "securePass123",
  "nombre": "Juan",
  "apellido": "Pérez",
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
    "telefono": "+34912345678",
    "direccion": "Calle Principal 123",
    "fecha_creacion": "2025-11-20T10:30:00Z"
  }
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
    "id_cliente": "4",
    "nombre": "Ricardo",
    "apellido": "Gomes",
    "correo": "ricardo@gmail.com",
    "telefono": "45123123",
    "dni": "12345678A",
    "direccion": "Cultural Mayor 10",
    "fecha_creacion": "2025-11-28T16:24:55.705Z",
    "fecha_actualizacion": "2025-11-28T16:24:55.705Z"
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
    "telefono": "+34912345678",
    "dni": "12345678A",
    "direccion": "Avenida Secundaria 456",
    "fecha_creacion": "2025-11-01T09:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:35:00Z"
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
    "fecha_actualizacion": "2025-11-20T10:35:00Z"
  }
]
```

---

### Obtener Cliente por ID
- **Método:** `GET`
- **Ruta:** `/clientes/:id`
- **Parámetros:** `id` (number) - ID del cliente
- **Descripción:** Obtiene un cliente específico por su ID

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
  "fecha_actualizacion": "2025-11-20T10:35:00Z"
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
  "direccion": "Plaza Mayor 10",
  "dni": "87654321B",
  "fecha_creacion": "2025-11-20T11:10:00Z"
}
```

---

### Actualizar Cliente
- **Método:** `PUT`
- **Ruta:** `/clientes/:id`
- **Parámetros:** `id` (number) - ID del cliente
- **Descripción:** Actualiza información del cliente

**Request Body:**
```json
{
  "nombre": "Pedro Updated",
  "telefono": "+34912121212",
  "dni": "87654321B"
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
  "fecha_actualizacion": "2025-11-20T11:15:00Z"
}
```

---

### Eliminar Cliente
- **Método:** `DELETE`
- **Ruta:** `/clientes/:id`
- **Parámetros:** `id` (number) - ID del cliente
- **Descripción:** Elimina un cliente

**Response (204 No Content)**

---

## Administradores

### Listar Administradores
- **Método:** `GET`
- **Ruta:** `/administradores`
- **Descripción:** Obtiene la lista de administradores

**Response (200 OK):**
```json
[
  {
    "id_admin": 1,
    "correo": "admin@example.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "+34912345678",
    "direccion": "Calle Principal 123",
    "fecha_creacion": "2025-11-01T08:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:30:00Z"
  }
]
```

---

### Obtener Administrador por ID
- **Método:** `GET`
- **Ruta:** `/administradores/:id`
- **Parámetros:** `id` (number) - ID del administrador
- **Descripción:** Obtiene un administrador específico

**Response (200 OK):**
```json
{
  "id_admin": 1,
  "correo": "admin@example.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "+34912345678",
  "direccion": "Calle Principal 123",
  "fecha_creacion": "2025-11-01T08:00:00Z",
  "fecha_actualizacion": "2025-11-20T10:30:00Z"
}
```

---

### Crear Administrador
- **Método:** `POST`
- **Ruta:** `/administradores`
- **Descripción:** Crea un nuevo administrador

**Request Body:**
```json
{
  "correo": "admin2@example.com",
  "password": "securePass123",
  "nombre": "María",
  "apellido": "López",
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
  "telefono": "+34987654321",
  "direccion": "Calle Secundaria 789",
  "fecha_creacion": "2025-11-20T10:40:00Z"
}
```

---

### Actualizar Administrador
- **Método:** `PUT`
- **Ruta:** `/administradores/:id`
- **Parámetros:** `id` (number) - ID del administrador
- **Descripción:** Actualiza información del administrador

**Request Body:**
```json
{
  "nombre": "María Updated",
  "telefono": "+34912121212",
}
```

**Response (200 OK):**
```json
{
  "id_admin": 2,
  "correo": "admin2@example.com",
  "nombre": "María Updated",
  "apellido": "López",
  "telefono": "+34912121212",
  "direccion": "Calle Secundaria 789",
  "fecha_actualizacion": "2025-11-20T11:00:00Z"
}
```

---

### Eliminar Administrador
- **Método:** `DELETE`
- **Ruta:** `/administradores/:id`
- **Parámetros:** `id` (number) - ID del administrador
- **Descripción:** Elimina un administrador

**Response (204 No Content)**

---

## Categorías

### Listar Categorías
- **Método:** `GET`
- **Ruta:** `/categorias`
- **Query Parameters (opcionales):**
  - `skip` (number) - Registros a saltar
  - `take` (number) - Registros a obtener
- **Descripción:** Obtiene la lista de categorías

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
    "fecha_actualizacion": "2025-11-20T10:50:00Z"
  },
  {
    "id_categoria": 2,
    "nombre": "Taladros",
    "descripcion": "Taladros eléctricos diversos",
    "imagen": "https://example.com/taladros.jpg",
    "id_padre": 1,
    "fecha_creacion": "2025-11-02T10:00:00Z",
    "fecha_actualizacion": "2025-11-20T10:50:00Z"
  }
]
```

---

### Obtener Categoría por ID
- **Método:** `GET`
- **Ruta:** `/categorias/:id`
- **Parámetros:** `id` (number) - ID de la categoría
- **Descripción:** Obtiene una categoría con sus productos e hijos

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

### Crear Categoría
- **Método:** `POST`
- **Ruta:** `/categorias`
- **Descripción:** Crea una nueva categoría

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
  "fecha_creacion": "2025-11-20T11:20:00Z"
}
```

---

### Actualizar Categoría
- **Método:** `PUT`
- **Ruta:** `/categorias/:id`
- **Parámetros:** `id` (number) - ID de la categoría
- **Descripción:** Actualiza una categoría

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
  "fecha_actualizacion": "2025-11-20T11:25:00Z"
}
```

---

### Eliminar Categoría
- **Método:** `DELETE`
- **Ruta:** `/categorias/:id`
- **Parámetros:** `id` (number) - ID de la categoría
- **Descripción:** Elimina una categoría

**Response (204 No Content)**

---

## Productos

### Listar Productos
- **Método:** `GET`
- **Ruta:** `/productos`
- **Query Parameters (opcionales):**
  - `skip` (number) - Registros a saltar
  - `take` (number) - Registros a obtener
- **Descripción:** Obtiene la lista de productos

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
    "fecha_actualizacion": "2025-11-20T11:00:00Z"
  }
]
```

---

### Buscar Productos por Patrón
- **Método:** `GET`
- **Ruta:** `/productos/buscar`
- **Query Parameters:**
  - `nombre` (string, **requerido**) - Patrón de búsqueda
- **Descripción:** Busca productos por nombre (case-insensitive)

**Example:**
```
GET /productos/buscar?nombre=taladro
```

**Response (200 OK):**
```json
[
    {
        "id_producto": "105",
        "categoria": {
            "id_categoria": "2",
            "nombre": "Arrancadores",
            "descripcion": "Categoría de arrancadores automotrices para vehículos livianos, comerciales y de carga. Incluye modelos para Toyota, Nissan, Hyundai, Kia, Mitsubishi y más.",
            "imagen": "img/categorias/arrancadores.jpg",
            "fecha_creacion": "2025-11-26T18:51:03.000Z",
            "fecha_actualizacion": "2025-11-26T18:51:03.000Z",
            "id_padre": null
        },
        "nombre": "ARRANCADOR 1GD ND",
        "descripcion": "Arrancador ND para motor 1GD, óptima respuesta y rendimiento.",
        "precio": "512.00",
        "stock": 10,
        "descuento": "0.00",
        "activo": 1,
        "imagen": "img/arrancadores/3.jpg",
        "fecha_creacion": "2025-11-26T18:53:33.824Z",
        "fecha_actualizacion": "2025-11-26T18:53:33.824Z"
    }
]
```

---

### Obtener Producto por ID
- **Método:** `GET`
- **Ruta:** `/productos/:id`
- **Parámetros:** `id` (number) - ID del producto
- **Descripción:** Obtiene un producto específico con sus modelos asociados

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
      "nombre": "Corolla"
    }
  ]
}
```

---

### Crear Producto
- **Método:** `POST`
- **Ruta:** `/productos`
- **Descripción:** Crea un nuevo producto

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
  "fecha_creacion": "2025-11-20T11:30:00Z"
}
```

---

### Actualizar Producto
- **Método:** `PUT`
- **Ruta:** `/productos/:id`
- **Parámetros:** `id` (number) - ID del producto
- **Descripción:** Actualiza un producto

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
  "fecha_actualizacion": "2025-11-20T11:35:00Z"
}
```

---

### Eliminar Producto
- **Método:** `DELETE`
- **Ruta:** `/productos/:id`
- **Parámetros:** `id` (number) - ID del producto
- **Descripción:** Elimina un producto

**Response (204 No Content)**

---

## Carritos

### Listar Carritos
- **Método:** `GET`
- **Ruta:** `/carritos`
- **Descripción:** Obtiene la lista de carritos

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
          "stock": 15
        }
      }
    ]
  }
]
```

---

### Obtener Carrito por ID
- **Método:** `GET`
- **Ruta:** `/carritos/:id`
- **Parámetros:** `id` (number) - ID del carrito
- **Descripción:** Obtiene un carrito específico con sus detalles

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
        "stock": 15
      }
    }
  ]
}
```

---

### Crear Carrito
- **Método:** `POST`
- **Ruta:** `/carritos`
- **Descripción:** Crea un nuevo carrito

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
  "fecha_creacion": "2025-11-20T12:10:00Z"
}
```

---

### Agregar Detalle al Carrito
- **Método:** `POST`
- **Ruta:** `/carritos/:id/detalles`
- **Parámetros:** `id` (number) - ID del carrito
- **Descripción:** Añade un producto al carrito

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

### Listar Detalles del Carrito
- **Método:** `GET`
- **Ruta:** `/carritos/:id/detalles`
- **Parámetros:** `id` (number) - ID del carrito
- **Descripción:** Obtiene los detalles del carrito

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

### Actualizar Carrito
- **Método:** `PUT`
- **Ruta:** `/carritos/:id`
- **Parámetros:** `id` (number) - ID del carrito
- **Descripción:** Actualiza el estado del carrito

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
  "fecha_actualizacion": "2025-11-20T12:15:00Z"
}
```

---

### Eliminar Carrito
- **Método:** `DELETE`
- **Ruta:** `/carritos/:id`
- **Parámetros:** `id` (number) - ID del carrito
- **Descripción:** Elimina un carrito

**Response (204 No Content)**

---

### Eliminar Detalle del Carrito
- **Método:** `DELETE`
- **Ruta:** `/carritos/detalles/:id_detalle`
- **Parámetros:** `id_detalle` (number) - ID del detalle
- **Descripción:** Elimina un producto del carrito

**Response (204 No Content)**

---

## Pedidos

### Listar Pedidos
- **Método:** `GET`
- **Ruta:** `/pedidos`
- **Descripción:** Obtiene la lista de pedidos

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
          "nombre": "Taladro DeWalt"
        }
      }
    ]
  }
]
```

---

### Obtener Pedido por ID
- **Método:** `GET`
- **Ruta:** `/pedidos/:id`
- **Parámetros:** `id` (number) - ID del pedido
- **Descripción:** Obtiene un pedido específico con sus detalles

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

### Crear Pedido
- **Método:** `POST`
- **Ruta:** `/pedidos`
- **Descripción:** Crea un nuevo pedido con detalles

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

### Actualizar Estado del Pedido
- **Método:** `PUT`
- **Ruta:** `/pedidos/:id`
- **Parámetros:** `id` (number) - ID del pedido
- **Descripción:** Actualiza el estado del pedido

**Estados válidos:** `pendiente`, `pagado`, `procesando`, `enviado`, `entregado`, `cancelado`, `reembolso`

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
  "fecha_actualizacion": "2025-11-20T12:30:00Z"
}
```

---

### Eliminar Pedido
- **Método:** `DELETE`
- **Ruta:** `/pedidos/:id`
- **Parámetros:** `id` (number) - ID del pedido
- **Descripción:** Elimina un pedido

**Response (204 No Content)**

---

## Comprobantes

### Listar Comprobantes
- **Método:** `GET`
- **Ruta:** `/comprobantes`
- **Descripción:** Obtiene la lista de comprobantes

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

### Obtener Comprobante por ID
- **Método:** `GET`
- **Ruta:** `/comprobantes/:id`
- **Parámetros:** `id` (number) - ID del comprobante
- **Descripción:** Obtiene un comprobante específico

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

### Crear Comprobante
- **Método:** `POST`
- **Ruta:** `/comprobantes`
- **Descripción:** Crea un nuevo comprobante

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
  "fecha_creacion": "2025-11-20T12:35:00Z"
}
```

---

### Eliminar Comprobante
- **Método:** `DELETE`
- **Ruta:** `/comprobantes/:id`
- **Parámetros:** `id` (number) - ID del comprobante
- **Descripción:** Elimina un comprobante

**Response (204 No Content)**

---

## Reportes

### Ventas Totales
- **Método:** `GET`
- **Ruta:** `/reportes/ventas/totales`
- **Query Parameters (opcionales):**
  - `desde` (string, ISO 8601) - Fecha inicial (ej: 2025-01-01)
  - `hasta` (string, ISO 8601) - Fecha final (ej: 2025-11-20)
- **Descripción:** Obtiene ventas totales en un rango de fechas

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
- **Query Parameters (opcionales):**
  - `desde` (string, ISO 8601) - Fecha inicial
  - `hasta` (string, ISO 8601) - Fecha final
- **Descripción:** Obtiene ventas agrupadas por producto

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

### Pedidos por Día
- **Método:** `GET`
- **Ruta:** `/reportes/pedidos/por-dia`
- **Query Parameters (opcionales):**
  - `desde` (string, ISO 8601) - Fecha inicial
  - `hasta` (string, ISO 8601) - Fecha final
- **Descripción:** Obtiene cantidad de pedidos por día

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

### Clientes Top
- **Método:** `GET`
- **Ruta:** `/reportes/clientes/top`
- **Query Parameters (opcionales):**
  - `limit` (number) - Número máximo de clientes (default: 10)
- **Descripción:** Obtiene clientes con más compras

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

### Stock Bajo
- **Método:** `GET`
- **Ruta:** `/reportes/stock/bajo`
- **Query Parameters (opcionales):**
  - `threshold` (number) - Umbral mínimo de stock (default: 10)
- **Descripción:** Obtiene productos con stock bajo

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

### Listar Modelos
- **Método:** `GET`
- **Ruta:** `/modelos`
- **Descripción:** Obtiene la lista de modelos de vehículos

**Response (200 OK):**
```json
[
  {
    "id_modelo": 1,
    "nombre": "Toyota Corolla",
    "id_marca": 1,
    "fecha_creacion": "2025-11-01T13:30:00Z",
    "fecha_actualizacion": "2025-11-20T13:30:00Z",
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

### Obtener Modelo por ID
- **Método:** `GET`
- **Ruta:** `/modelos/:id`
- **Parámetros:** `id` (number) - ID del modelo
- **Descripción:** Obtiene un modelo específico con sus productos

**Response (200 OK):**
```json
{
  "id_modelo": 1,
  "nombre": "Toyota Corolla",
  "fecha_creacion": "2025-11-01T13:30:00Z",
  "fecha_actualizacion": "2025-11-20T13:30:00Z",
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

### Crear Modelo
- **Método:** `POST`
- **Ruta:** `/modelos`
- **Descripción:** Crea un nuevo modelo de vehículo

**Request Body:**
```json
{
  "nombre": "3 Series",
}
```

**Response (201 Created):**
```json
{
  "id_modelo": 10,
  "nombre": "3 Series",
  "fecha_creacion": "2025-11-20T13:40:00Z"
}
```

---

### Actualizar Modelo
- **Método:** `PUT`
- **Ruta:** `/modelos/:id`
- **Parámetros:** `id` (number) - ID del modelo
- **Descripción:** Actualiza un modelo

**Request Body:**
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
  "fecha_actualizacion": "2025-11-20T13:45:00Z"
}
```

---

### Eliminar Modelo
- **Método:** `DELETE`
- **Ruta:** `/modelos/:id`
- **Parámetros:** `id` (number) - ID del modelo
- **Descripción:** Elimina un modelo

**Response (204 No Content)**

---

## Producto-Modelo

### Crear Asignación Producto-Modelo
- **Método:** `POST`
- **Ruta:** `/producto-modelos`
- **Descripción:** Asigna un producto a un modelo de vehículo

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
- **Descripción:** Obtiene todas las asignaciones producto-modelo

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
      "nombre": "Toyota Corolla",
    }
  }
]
```

---

### Obtener Modelos de un Producto
- **Método:** `GET`
- **Ruta:** `/producto-modelos/producto/:id_producto`
- **Parámetros:** `id_producto` (number) - ID del producto
- **Descripción:** Obtiene todos los modelos asociados a un producto

**Response (200 OK):**
```json
[
  {
    "id_modelo": 5,
    "nombre": "Toyota Corolla",
  },
  {
    "id_modelo": 6,
    "nombre": "Toyota RAV4",
  }
]
```

---

### Obtener Productos de un Modelo
- **Método:** `GET`
- **Ruta:** `/producto-modelos/modelo/:id_modelo`
- **Parámetros:** `id_modelo` (number) - ID del modelo
- **Descripción:** Obtiene todos los productos asociados a un modelo

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

### Desasignar Producto de Modelo
- **Método:** `DELETE`
- **Ruta:** `/producto-modelos/:id_producto/:id_modelo`
- **Parámetros:**
  - `id_producto` (number) - ID del producto
  - `id_modelo` (number) - ID del modelo
- **Descripción:** Desasigna un producto de un modelo

**Response (204 No Content)**

---



## Resumen de Códigos HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 204 | No Content - Operación exitosa sin contenido |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - Sin autenticación |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Estructura de Respuestas

### Respuesta Exitosa
```json
{
  "id": 1,
  "field": "value",
  "fecha_creacion": "2025-11-20T10:30:00Z"
}
```

### Respuesta de Error
```json
{
  "statusCode": 400,
  "message": "Descripción del error"
}
```

---

**Última actualización:** 20 de noviembre de 2025
**Versión de API:** 1.0.0
**Base URL:** http://154.38.160.251/api