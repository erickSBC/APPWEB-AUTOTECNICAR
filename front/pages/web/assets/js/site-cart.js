/* ===========================================================
   CARRITO GLOBAL - AUTOTECNICAR / AUTOMAS
   Persistencia con localStorage
   Compatible con header.html (mini-cart)
   Compatible con tienda.html y carrito.html
=========================================================== */

const CART_KEY = "automas_cart";

// ==========================================================
// UTILIDADES DE LOCALSTORAGE
// ==========================================================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function guardarCarrito(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    actualizarMiniCarrito();
}

// ==========================================================
// AÑADIR PRODUCTO
// ==========================================================
function addToCart(id, nombre, precio, imagen, cantidad = 1) {
    const cart = obtenerCarrito();

    const item = cart.find(p => p.id === id);

    if (item) {
        item.cantidad += cantidad;
    } else {
        cart.push({
            id,
            nombre,
            precio: parseFloat(precio),
            imagen,
            cantidad
        });
    }

    guardarCarrito(cart);
}

// ==========================================================
// ACTUALIZAR CANTIDAD
// ==========================================================
function actualizarCantidad(id, cantidad) {
    const cart = obtenerCarrito();

    const item = cart.find(p => p.id === id);
    if (item) {
        item.cantidad = Math.max(1, cantidad);
    }

    guardarCarrito(cart);
}

// ==========================================================
// ELIMINAR PRODUCTO
// ==========================================================
function eliminarProducto(id) {
    let cart = obtenerCarrito();

    cart = cart.filter(p => p.id !== id);

    guardarCarrito(cart);
}

// ==========================================================
// CALCULAR SUBTOTAL
// ==========================================================
function calcularSubtotal() {
    const cart = obtenerCarrito();
    return cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2);
}

// ==========================================================
// MINI-CARRITO EN EL HEADER
// ==========================================================
function actualizarMiniCarrito() {
    const cart = obtenerCarrito();

    // contador
    const badge = document.querySelector(".cart-count");
    if (badge) badge.textContent = cart.length;

    // menú desplegable
    const mc = document.querySelector(".mini-cart .mc-items");
    if (!mc) return;

    mc.innerHTML = "";

    if (cart.length === 0) {
        mc.innerHTML = `<div class="mc-empty">El carrito está vacío</div>`;
        document.querySelector("#miniCartTotal").textContent = "S/ 0.00";
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("mc-item");

        row.innerHTML = `
            <img src="${item.imagen}" alt="">
            
            <div classs="mc-info">
                <div class="mc-name">${item.nombre}</div>
                <div class="mc-details">
                    ${item.cantidad} × S/ ${item.precio.toFixed(2)}
                </div>
            </div>

            <div class="mc-total">
                S/ ${(item.precio * item.cantidad).toFixed(2)}
            </div>

            <button class="remove-btn" data-id="${item.id}">✕</button>
        `;



        mc.appendChild(row);
    });

    // total
    document.querySelector("#miniCartTotal").textContent = "S/ " + calcularSubtotal();

    // eliminar desde mini-cart
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarProducto(btn.dataset.id);
        });
    });
}

// ==========================================================
// INICIALIZAR MINI-CARRITO SI EXISTE
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    actualizarMiniCarrito();
});

// ==========================================================
// USO EN TIENDA.HTML
// Botón: <button class="btn-add" data-id="..." ... >
// ==========================================================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add")) {

        const card = e.target.closest(".product-card");

        const id = card.dataset.id || Math.random().toString(36).substring(2);
        const nombre = card.querySelector(".product-title").textContent;
        const precio = parseFloat(
            card.querySelector(".product-price").textContent.replace("S/", "")
        );
        const imagen = card.querySelector("img").src;
        const cantidad = parseInt(
            card.querySelector(".qty-box input").value
        );

        addToCart(id, nombre, precio, imagen, cantidad);
    }
});
