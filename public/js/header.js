const headers = {
    home: `
        <header class="delimitador_deco">
            <div>
                <a class="home-link home-link-angel" href="../../index.html">
                    <img src="../../img/nav_angel_icon.svg" alt="Ir al inicio">
                </a>
            </div>
        </header>
    `,
    volver: `
        <header>
            <a href="../user/partidas.html" class="link-volver">
                ← Volver
            </a>
        </header>
    `
};

document.querySelectorAll("[data-header]").forEach((container) => {
    const headerName = container.dataset.header;
    const header = headers[headerName];

    if (!header) {
        console.error(`No existe un header llamado "${headerName}".`);
        return;
    }

    container.outerHTML = header;
});
