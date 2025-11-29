
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {

        const token = localStorage.getItem("token");
        const payload = token? JSON.parse(atob(token.split(".")[1])) : null;
        const cuentaBtn = document.getElementById("cuentaBtn");
        const cuentaMenu = document.getElementById("cuentaMenu");
        const nombreUsuario = document.getElementById("nombreUsuario");
        const logoutBtn = document.getElementById("logoutBtn");

        const cartBtn = document.getElementById("cartBtn");
        const miniCart = cartBtn.querySelector(".mini-cart");

        /* SI ESTÁ LOGUEADO MOSTRAR NOMBRE */
        if (token && payload?.rol != 'cliente') {
            window.location.href = "../dashboard.html";
        }
        if (token && payload?.nombre) {
            nombreUsuario.textContent = payload.nombre;
        }

        /* CLICK EN CUENTA */
        cuentaBtn.onclick = (e) => {
            if (!token) {
                window.location.href = "../sign-in.html";
                return;
            }
            e.stopPropagation();
            cuentaMenu.style.display =
                cuentaMenu.style.display === "block" ? "none" : "block";
            miniCart.style.display = "none"; // cerrar carrito si está abierto
        };

        /* CLICK EN CARRITO */
        cartBtn.onclick = (e) => {
            e.stopPropagation();
            miniCart.style.display =
                miniCart.style.display === "block" ? "none" : "block";
            cuentaMenu.style.display = "none";
        };

        /* CLICK FUERA → CERRAR */
        document.addEventListener("click", () => {
            cuentaMenu.style.display = "none";
            miniCart.style.display = "none";
        });

        /* LOGOUT */
        logoutBtn.onclick = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("automas_carrito_id");
            window.location.href = "home.html";
        };

    }, 300);
});

