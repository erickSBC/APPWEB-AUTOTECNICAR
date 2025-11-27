

document.addEventListener("DOMContentLoaded", () => {
    // 1. Verificar que el header se haya cargado ANTES de ejecutar la lógica.
    // Usamos setTimeout para dar tiempo al fetch del header de home.html.
    setTimeout(() => {

        const token = localStorage.getItem("token");
        // const token = true;
        const cuentaBtn = document.getElementById("cuentaBtn");
        const cuentaMenu = document.getElementById("cuentaMenu");
        const logoutBtn = document.getElementById("logoutBtn");

        /* SI NO ESTÁ LOGUEADO → IR A SIGN-IN */
        if (!token) {
            cuentaBtn.onclick = () => {
                window.location.href = "../sign-in.html";
            };
        }
        else {
            /* SI ESTÁ LOGUEADO → MOSTRAR MENÚ */
            cuentaBtn.onclick = (e) => {
                e.stopPropagation();
                cuentaMenu.style.display =
                    cuentaMenu.style.display === "block" ? "none" : "block";
            };

            /* CERRAR MENÚ SI SE HACE CLICK AFUERA */
            document.body.onclick = () => {
                cuentaMenu.style.display = "none";
            };

            /* CERRAR SESIÓN */
            logoutBtn.onclick = () => {
                localStorage.removeItem("token");
                location.reload();
            };
        }
        document.addEventListener("click", (e) => {
            const cartIcon = document.querySelector(".cart-icon");
            const miniCart = document.querySelector(".mini-cart");

            if (cartIcon.contains(e.target)) {
                // toggle
                miniCart.style.display = miniCart.style.display === "block" ? "none" : "block";
            }
            else if (!miniCart.contains(e.target) && !cartIcon.contains(e.target) ) {
                miniCart.style.display = "none";
            }
        });

    }, 300); // Pequeña espera para asegurar que el fetch ha terminado.
});