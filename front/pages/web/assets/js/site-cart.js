/* ===========================================================
   CARRITO GLOBAL - SOLO BACKEND
   Requiere:
   - token JWT en localStorage ("token")
   - id_cliente en localStorage ("clienteId")
   Endpoints (ajusta si tu API cambia nombres):
   - POST   /carrito                       -> crear carrito para cliente
   - GET    /carrito/:id_carrito/detalles  -> listar detalles del carrito
   - POST   /carrito/:id_carrito/detalles  -> agregar producto
   - PUT    /carrito/detalles/:id_detalle  -> actualizar cantidad
   - DELETE /carrito/detalles/:id_detalle  -> eliminar detalle
=========================================================== */

const API_BASE = "http://154.38.160.251/api";
const CART_BACKEND_ID_KEY = "automas_carrito_id";
const LOGIN_URL = "../sign-in.html"; // ajusta ruta si es distinta

// -------------------- AUTH HELPERS --------------------
function getToken() {
  return localStorage.getItem("token") || null;
  
}

function getClienteId() {
  const tokenn = getToken();
  const payload = tokenn? JSON.parse(atob(tokenn.split(".")[1])) : null;
   console.log(payload.sub)
  return Number(payload.sub);
}

function requireLogin() {
  const token = getToken();
  const idCliente = getClienteId();
  if (!token || !idCliente) {
    alert("Para usar el carrito debes iniciar sesión como cliente.");
    window.location.href = LOGIN_URL;
    return null;
  }
  return { token, idCliente };
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {})
  };
}

// -------------------- BACKEND CARRITO --------------------

// Crea o devuelve carrito activo del cliente
async function getOrCreateBackendCart() {
  const auth = requireLogin();
  if (!auth) return null;

  let idCarrito = localStorage.getItem(CART_BACKEND_ID_KEY);

  if (!idCarrito) {
    const res = await fetch(`${API_BASE}/carrito`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ id_cliente: auth.idCliente })
    });
    if (!res.ok) {
      console.error("Error creando carrito:", await res.text());
      return null;
    }
    const data = await res.json();
    // Ajusta la propiedad según tu respuesta
    idCarrito = data.id_carrito ?? data.id ?? data.carrito?.id_carrito;
    localStorage.setItem(CART_BACKEND_ID_KEY, idCarrito);
  }

  return Number(idCarrito);
}

// Obtiene detalles del carrito desde backend
async function fetchBackendCart() {
  const idCarrito = await getOrCreateBackendCart();
  if (!idCarrito) return null;

  const res = await fetch(`${API_BASE}/carrito/${idCarrito}/detalles`, {
    method: "GET",
    headers: authHeaders()
  });

  if (!res.ok) {
    console.error("Error obteniendo detalles de carrito:", await res.text());
    return null;
  }

  const data = await res.json();
  return { id_carrito: idCarrito, raw: data };
}

// -------------------- API PÚBLICA DEL CARRITO --------------------

// Añadir producto desde tienda/producto
async function addToCart(idProducto, nombre, precio, imagen, cantidad = 1) {
  if(!localStorage.getItem("token")){
    alert("Inicio de sesion requerido.")
    return;
  }
  const idCarrito = await getOrCreateBackendCart();
  if (!idCarrito) return;

  const body = {
    id_producto: idProducto,
    cantidad: cantidad
    // si tu endpoint pide más campos, añádelos aquí
  };

  const res = await fetch(`${API_BASE}/carrito/${idCarrito}/detalles`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    console.error("Error agregando al carrito:", await res.text());
    alert("No se pudo agregar el producto al carrito.");
    return;
  }

  actualizarMiniCarrito();
}

// Actualizar cantidad (por ahora solo usado desde carrito.html)
async function actualizarCantidadDetalle(idDetalleBackend, nuevaCantidad) {
  const auth = requireLogin();
  if (!auth || !idDetalleBackend) return;

  const res = await fetch(`${API_BASE}/carrito/detalles/${idDetalleBackend}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ cantidad: nuevaCantidad })
  });

  if (!res.ok) {
    console.error("Error actualizando cantidad:", await res.text());
    return;
  }

  actualizarMiniCarrito();
}

// Eliminar un detalle
async function eliminarDetalle(idDetalleBackend) {
  const auth = requireLogin();
  if (!auth || !idDetalleBackend) return;

  const res = await fetch(`${API_BASE}/carrito/detalles/${idDetalleBackend}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  if (!res.ok && res.status !== 204) {
    console.error("Error eliminando detalle:", await res.text());
    return;
  }

  actualizarMiniCarrito();
}

// -------------------- MINI CARRITO HEADER --------------------
async function actualizarMiniCarrito() {
  const badge = document.querySelector(".cart-count");
  const mc = document.querySelector(".mini-cart .mc-items");
  const totalSpan = document.querySelector("#miniCartTotal");
  console.log("badge",badge);
  console.log("mc",mc);
  console.log("totalSpan",totalSpan);
  if (!badge || !mc || !totalSpan) return;
  
  const backend = await fetchBackendCart();
  if (!backend) {
    badge.textContent = "0";
    mc.innerHTML = `<div class="mc-empty">Inicia sesión para ver tu carrito.</div>`;
    totalSpan.textContent = "S/ 0.00";
    return;
  }

  // Tolerante a distintas formas de respuesta: array directo o {detalles:[]}
  const detallesRaw = Array.isArray(backend.raw)
    ? backend.raw
    : (backend.raw.detalles || []);

  if (!detallesRaw.length) {
    badge.textContent = "0";
    mc.innerHTML = `<div class="mc-empty">El carrito está vacío.</div>`;
    totalSpan.textContent = "S/ 0.00";
    return;
  }

  // Normalizar detalles a un formato común
  const detalles = detallesRaw.map(d => {
    const producto = d.producto || d.producto_detalle || {};
    const precio = parseFloat(d.precio_unitario ?? producto.precio ?? d.precio ?? 0);
    const cantidad = d.cantidad ?? d.cant ?? 1;

    return {
      idDetalle: d.id_detalle ?? d.id ?? d.id_detalle_carrito,
      idProducto: producto.id_producto ?? d.id_producto,
      nombre: producto.nombre ?? d.nombre_producto ?? "Producto",
      cantidad,
      precio,
      imagen:
        producto.imagen ||
        producto.imagen_url ||
        "https://via.placeholder.com/60x60?text=IMG",
      subtotal: parseFloat(d.subtotal ?? precio * cantidad)
    };
  });

  // Pintar
  badge.textContent = String(detalles.length);
  mc.innerHTML = "";

  let subtotalGeneral = 0;

  detalles.forEach(item => {
    subtotalGeneral += item.subtotal;

    const row = document.createElement("div");
    row.classList.add("mc-item");

    row.innerHTML = `
      <img src="${item.imagen}" alt="">
      <div class="mc-info">
        <div class="mc-name">${item.nombre}</div>
        <div class="mc-details">${item.cantidad} × S/ ${item.precio.toFixed(2)}</div>
      </div>
      <div class="mc-total">S/ ${item.subtotal.toFixed(2)}</div>
      <button class="remove-btn" data-detalle="${item.idDetalle}">✕</button>
    `;

    mc.appendChild(row);
  });

  totalSpan.textContent = "S/ " + subtotalGeneral.toFixed(2);

  // listeners para eliminar
  mc.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idDetalle = btn.dataset.detalle;
      eliminarDetalle(idDetalle);
    });
  });
}

// -------------------- HOOKS GLOBALES --------------------

// Al cargar la página, refrescar mini-carrito si hay sesión
document.addEventListener("DOMContentLoaded", () => {
  console.log("cargó con logsiyo:",document.querySelector(".cart-count"));
  if (getToken() && getClienteId()) {
    actualizarMiniCarrito();
  }
});

// Captura global de clicks en botones "Agregar al carrito"
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const idProducto = card.dataset.id || card.getAttribute("data-id");
    const nombre = card.querySelector(".product-title")?.textContent?.trim() || "";
    const precio = parseFloat(
      card
        .querySelector(".product-price")
        ?.textContent.replace("S/", "")
        .trim() || "0"
    );
    const imagen = card.querySelector("img")?.src || "";
    const cantidad = parseInt(
      card.querySelector(".qty-box input")?.value || "1",
      10
    );

    addToCart(idProducto, nombre, precio, imagen, cantidad);
  }
});
