// ======================================================
// PERSONALIZACIÓN DE LA INTERFAZ
// (paleta de color, modo claro/oscuro, color/imagen de
// fondo, transparencia)
// ======================================================
//
// Nota: la app todavía no tiene sesiones reales contra el backend,
// así que -igual que perfil.js con los datos del perfil- guardamos
// la configuración en localStorage. Queda "asociada" al perfil actual
// guardado en el navegador; cuando haya login real, este mismo objeto
// debería viajar al backend y cargarse por usuario.

const CLAVE_STORAGE = "lockin_personalizacion";

// Cada paleta trae sus colores reales (no un solo color de acento):
// - colores: para pintar la vista previa en el panel
// - accent: color principal (botones, títulos, barra de progreso)
// - accentDark: variante oscura (hover / detalles)
// - tint: variante clara (usada como acento de texto sobre fondos oscuros)
const PALETAS = [
    {
        id: "predeterminado",
        nombre: "Predeterminado",
        colores: ["#222526", "#353A3E", "#E0E0E0", "#1A1A1A", "#BFBFBF"],
        accent: "#353A3E",
        accentDark: "#1A1A1A",
        tint: "#E0E0E0"
    },
    {
        id: "rosa",
        nombre: "Rosa",
        colores: ["#720002", "#DB8291", "#F4D6DC"],
        accent: "#DB8291",
        accentDark: "#720002",
        tint: "#F4D6DC"
    },
    {
        id: "marron",
        nombre: "Marrón",
        colores: ["#342519", "#684F36", "#B39977", "#EDE6D9"],
        accent: "#684F36",
        accentDark: "#342519",
        tint: "#EDE6D9"
    },
    {
        id: "verde",
        nombre: "Verde",
        colores: ["#354220", "#47622A", "#799831", "#93E651", "#DFE7D1"],
        accent: "#47622A",
        accentDark: "#354220",
        tint: "#DFE7D1"
    },
    {
        id: "azul",
        nombre: "Azul",
        colores: ["#16294A", "#3B587D", "#9E8C7C", "#F7E7CE", "#F5F4F0"],
        accent: "#3B587D",
        accentDark: "#16294A",
        tint: "#F5F4F0"
    }
];

const CONFIG_DEFAULT = {
    paletaId: "rosa",
    modo: "claro",     // "claro" | "oscuro"
    colorFondo: null,   // color sólido de fondo, o null
    fondo: null,        // dataURL de imagen de fondo, o null
    opacidad: 1          // 0.3 a 1
};

function obtenerPaleta(id) {
    return PALETAS.find(p => p.id === id) || PALETAS[0];
}

// config ya guardada (la última confirmada) y config "en edición" (preview en vivo)
let configGuardada = cargarConfig();
let configBorrador = { ...configGuardada };

function cargarConfig() {
    try {
        const guardado = localStorage.getItem(CLAVE_STORAGE);
        if (!guardado) return { ...CONFIG_DEFAULT };
        return { ...CONFIG_DEFAULT, ...JSON.parse(guardado) };
    } catch {
        return { ...CONFIG_DEFAULT };
    }
}

function guardarConfig(config) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(config));
}

// Aplica una config al documento (esto es lo que da el "tiempo real")
function aplicarConfig(config) {
    const paleta = obtenerPaleta(config.paletaId);

    document.documentElement.setAttribute("data-modo", config.modo);
    document.documentElement.style.setProperty("--accent-color", paleta.accent);
    document.documentElement.style.setProperty("--accent-dark", paleta.accentDark);
    document.documentElement.style.setProperty("--accent-tint", paleta.tint);
    document.documentElement.style.setProperty("--panel-opacity", config.opacidad);

    document.body.style.backgroundColor = config.colorFondo || "";
    document.body.style.backgroundImage = config.fondo ? `url(${config.fondo})` : "none";
}

// Aplicamos apenas carga la página (esto cubre el "al iniciar sesión de nuevo")
aplicarConfig(configGuardada);

// ======================================================
// UI: paletas, modo, fondo, slider, botones
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("personalizacionOverlay");
    const abrirBtn = document.getElementById("abrirPersonalizacion");
    const cerrarBtn = document.getElementById("cerrarPersonalizacion");
    const paletasCont = document.getElementById("paletasGrid");
    const modoCont = document.getElementById("modoToggle");
    const inputFondo = document.getElementById("inputFondo");
    const inputColorFondo = document.getElementById("inputColorFondo");
    const quitarFondoBtn = document.getElementById("quitarFondo");
    const fondoPreview = document.getElementById("fondoPreview");
    const slider = document.getElementById("opacidadSlider");
    const opacidadValor = document.getElementById("opacidadValor");
    const guardarBtn = document.getElementById("guardarPersonalizacion");
    const cancelarBtn = document.getElementById("cancelarPersonalizacion");
    const restablecerBtn = document.getElementById("restablecerPersonalizacion");

    if (!overlay || !abrirBtn) return; // esta página no tiene el panel

    // --- pinta las opciones de paleta (cada una con sus colores reales) ---
    PALETAS.forEach(paleta => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "paleta-opcion";
        btn.dataset.paletaId = paleta.id;

        const preview = document.createElement("div");
        preview.className = "paleta-preview";
        paleta.colores.forEach(color => {
            const franja = document.createElement("span");
            franja.style.backgroundColor = color;
            preview.appendChild(franja);
        });

        const label = document.createElement("small");
        label.textContent = paleta.nombre;

        btn.appendChild(preview);
        btn.appendChild(label);

        btn.addEventListener("click", () => {
            configBorrador.paletaId = paleta.id;
            pintarUI();
            aplicarConfig(configBorrador); // preview en tiempo real
        });

        paletasCont.appendChild(btn);
    });

    // --- pinta las opciones de modo claro/oscuro ---
    const MODOS = [
        { id: "claro", nombre: "Modo claro", icono: "bi-sun" },
        { id: "oscuro", nombre: "Modo oscuro", icono: "bi-moon-stars" }
    ];

    MODOS.forEach(modo => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "modo-opcion";
        btn.dataset.modoId = modo.id;
        btn.innerHTML = `<i class="bi ${modo.icono}"></i> ${modo.nombre}`;

        btn.addEventListener("click", () => {
            configBorrador.modo = modo.id;
            pintarUI();
            aplicarConfig(configBorrador); // preview en tiempo real
        });

        modoCont.appendChild(btn);
    });

    function pintarUI() {
        [...paletasCont.children].forEach(btn => {
            btn.classList.toggle("selected", btn.dataset.paletaId === configBorrador.paletaId);
        });

        [...modoCont.children].forEach(btn => {
            btn.classList.toggle("selected", btn.dataset.modoId === configBorrador.modo);
        });

        fondoPreview.style.backgroundImage = configBorrador.fondo
            ? `url(${configBorrador.fondo})`
            : "none";
        fondoPreview.style.backgroundColor = configBorrador.colorFondo || "";

        inputColorFondo.value = configBorrador.colorFondo || "#d5c5c8";

        slider.value = configBorrador.opacidad;
        opacidadValor.textContent = Math.round(configBorrador.opacidad * 100) + "%";
    }

    function abrirPanel() {
        configBorrador = { ...configGuardada };
        pintarUI();
        aplicarConfig(configBorrador);
        overlay.classList.add("mostrar");
    }

    function cerrarPanel() {
        overlay.classList.remove("mostrar");
    }

    abrirBtn.addEventListener("click", abrirPanel);

    cerrarBtn.addEventListener("click", () => {
        aplicarConfig(configGuardada); // cancelar = volver a lo último guardado
        cerrarPanel();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            aplicarConfig(configGuardada);
            cerrarPanel();
        }
    });

    // --- color de fondo sólido ---
    inputColorFondo.addEventListener("input", () => {
        configBorrador.colorFondo = inputColorFondo.value;
        pintarUI();
        aplicarConfig(configBorrador); // preview en tiempo real
    });

    // --- imagen de fondo personalizada ---
    inputFondo.addEventListener("change", () => {
        const archivo = inputFondo.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = () => {
            configBorrador.fondo = lector.result;
            pintarUI();
            aplicarConfig(configBorrador); // preview en tiempo real
        };
        lector.readAsDataURL(archivo);
    });

    quitarFondoBtn.addEventListener("click", () => {
        configBorrador.fondo = null;
        configBorrador.colorFondo = null;
        inputFondo.value = "";
        pintarUI();
        aplicarConfig(configBorrador);
    });

    // --- transparencia ---
    slider.addEventListener("input", () => {
        configBorrador.opacidad = parseFloat(slider.value);
        opacidadValor.textContent = Math.round(configBorrador.opacidad * 100) + "%";
        aplicarConfig(configBorrador); // preview en tiempo real
    });

    // --- confirmar cambios ---
    guardarBtn.addEventListener("click", () => {
        configGuardada = { ...configBorrador };
        guardarConfig(configGuardada);
        aplicarConfig(configGuardada);
        cerrarPanel();
    });

    // --- cancelar: descarta el borrador y vuelve a lo guardado ---
    cancelarBtn.addEventListener("click", () => {
        aplicarConfig(configGuardada);
        cerrarPanel();
    });

    // --- restablecer valores por defecto (se aplica y se guarda al toque) ---
    restablecerBtn.addEventListener("click", () => {
        configBorrador = { ...CONFIG_DEFAULT };
        configGuardada = { ...CONFIG_DEFAULT };
        guardarConfig(configGuardada);
        inputFondo.value = "";
        pintarUI();
        aplicarConfig(configGuardada);
    });
});