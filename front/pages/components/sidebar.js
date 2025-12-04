
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {

        // js/sidebar.js
        const sidebar = document.querySelector(".app-sidebar");
        const logoutBtn = document.getElementById("logoutBtn");

        if (!sidebar) return;

        // Toggle de submenús
        const toggles = sidebar.querySelectorAll('[data-sb-toggle="submenu"]');

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", (e) => {
                e.preventDefault();
                const item = toggle.closest(".sb-item");

                if (!item) return;

                // Si quieres que solo haya un submenú abierto a la vez, descomenta esto:
                /*
                const siblings = item.parentElement.querySelectorAll(".sb-item.has-submenu");
                siblings.forEach((s) => {
                  if (s !== item) {
                    s.classList.remove("is-open");
                  }
                });
                */

                item.classList.toggle("is-open");
            });
        });

        // Marcar activo según la URL actual
        const links = sidebar.querySelectorAll(".sb-link[href]");

        const currentPath = window.location.pathname.split("/").pop();

        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            const file = href.split("/").pop();

            if (file === currentPath && file !== "#") {
                const item = link.closest(".sb-item");
                if (item) {
                    item.classList.add("is-active");

                    // Si está dentro de un submenú, abre el padre
                    const parentWithSubmenu = item.closest(".sb-item.has-submenu");
                    if (parentWithSubmenu) {
                        parentWithSubmenu.classList.add("is-open");
                    }
                }
            }
        });

        /* LOGOUT */
        logoutBtn.onclick = () => {
            localStorage.removeItem("token");
            window.location.href = "sign-in.html";
        };
    }, 300);


    
});