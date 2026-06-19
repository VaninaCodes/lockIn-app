// ========================================
// LISTA DE TAREAS
// ========================================

let tasks = JSON.parse(
    localStorage.getItem("tareas") || "[]"
);

function save() {

    localStorage.setItem(
        "tareas",
        JSON.stringify(tasks)
    );

    render();
    actualizarProgreso();
}

function addTask() {

    const input =
        document.getElementById("task-input");

    const text =
        input.value.trim();

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text: text,
        done: false,
        editing: false
    });

    input.value = "";

    save();
}

function toggleDone(id) {

    const tarea =
        tasks.find(t => t.id === id);

    if (tarea) {
        tarea.done = !tarea.done;
    }

    save();
}

function startEdit(id) {

    tasks.forEach(
        t => t.editing = false
    );

    const tarea =
        tasks.find(t => t.id === id);

    if (tarea) {
        tarea.editing = true;
    }

    save();
}

function saveEdit(id) {

    const input =
        document.getElementById(
            "edit-" + id
        );

    const tarea =
        tasks.find(t => t.id === id);

    if (tarea && input) {

        const texto =
            input.value.trim();

        if (texto) {
            tarea.text = texto;
        }

        tarea.editing = false;
    }

    save();
}

function deleteTask(id) {

    tasks =
        tasks.filter(
            t => t.id !== id
        );

    save();
}

function clearCompleted() {

    tasks =
        tasks.filter(
            t => !t.done
        );

    save();
}

function render() {

    const list =
        document.getElementById(
            "task-list"
        );

    const counter =
        document.getElementById(
            "counter"
        );

    const pendientes =
        tasks.filter(
            t => !t.done
        ).length;

    counter.textContent =
        tasks.length === 0
        ? ""
        : `${pendientes} pendientes · ${tasks.length} total`;

    if (tasks.length === 0) {

        list.innerHTML =
            "<p>No hay tareas.</p>";

        return;
    }

    list.innerHTML =
        tasks.map(t => `
        <div>

            <input
                type="checkbox"
                ${t.done ? "checked" : ""}
                onchange="toggleDone(${t.id})"
            >

            ${
                t.editing
                ?
                `<input
                    id="edit-${t.id}"
                    value="${t.text}"
                >`
                :
                `<span>${t.text}</span>`
            }

            ${
                t.editing
                ?
                `<button onclick="saveEdit(${t.id})">
                    Guardar
                </button>`
                :
                `<button onclick="startEdit(${t.id})">
                    Editar
                </button>`
            }

            <button onclick="deleteTask(${t.id})">
                Eliminar
            </button>

        </div>
    `).join("");
}

document
.getElementById("task-input")
.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        addTask();
    }

});

// ========================================
// POMODORO
// ========================================

let pomodoroSegundos = 0;
let pomodoroMinutos = 25;
let pomodoroHoras = 0;
let minutosEstudio = 25;
let minutosDescanso = 5;

let totalSets = 1;
let setActual = 1;

let esDescanso = false;
let segundosAcumulados = 0;

const cronometro =
    document.getElementById("cronometro");

const minutosActuales =
    document.getElementById("minutosActuales");

let intervaloPomodoro = null;

const tiempo =
    document.getElementById("tiempo");

function actualizarPomodoro() {

    pomodoroSegundos--;

    // Tiempo acumulado de estudio
    segundosAcumulados++;

let minutosAcumulados =
    Math.floor(segundosAcumulados / 60);

let segundosMostrar =
    segundosAcumulados % 60;

cronometro.textContent =
    String(minutosAcumulados).padStart(2, "0")
    + ":"
    + String(segundosMostrar).padStart(2, "0");

minutosActuales.textContent =
    minutosAcumulados;
    actualizarProgreso();

    if (pomodoroSegundos < 0) {

        pomodoroSegundos = 59;
        pomodoroMinutos--;

    }

    if (
    pomodoroMinutos === 0 &&
    pomodoroSegundos === 0
) {

    if (!esDescanso) {

        esDescanso = true;

        document.getElementById(
            "estadoPomodoro"
        ).textContent =
            "Descanso";

        pomodoroMinutos =
            minutosDescanso;

        pomodoroSegundos = 0;

        return;
    }

    else {

        setActual++;

        if (
            setActual > totalSets
        ) {

            clearInterval(
                intervaloPomodoro
            );

            intervaloPomodoro = null;

            alert(
                "Terminaste todas las sesiones de estudio."
            );

            return;
        }

        esDescanso = false;

        document.getElementById(
            "estadoPomodoro"
        ).textContent =
            "Estudio";

        pomodoroMinutos =
            minutosEstudio;

        pomodoroSegundos = 0;

        return;
    }
}

    tiempo.textContent =
        `${String(pomodoroHoras).padStart(2,"0")}:` +
        `${String(pomodoroMinutos).padStart(2,"0")}:` +
        `${String(pomodoroSegundos).padStart(2,"0")}`;
}

document
.getElementById("iniciar")
.addEventListener("click", () => {

    if (intervaloPomodoro !== null) return;

    const opcion =
        document.getElementById(
            "tipoPomodoro"
        ).value;

    const partes =
        opcion.split("-");

    minutosEstudio =
        parseInt(partes[0]);

    minutosDescanso =
        parseInt(partes[1]);

    totalSets =
        parseInt(
            document.getElementById(
                "cantidadSets"
            ).value
        );

    if (
        pomodoroMinutos === 25 &&
        pomodoroSegundos === 0
    ) {

        pomodoroMinutos =
            minutosEstudio;
    }

    objetivo =
        minutosEstudio * totalSets;

    document.getElementById(
        "objetivoMinutos"
    ).textContent = objetivo;

    intervaloPomodoro =
        setInterval(
            actualizarPomodoro,
            1000
        );
});

document
.getElementById("pausar")
.addEventListener("click", () => {

    clearInterval(
        intervaloPomodoro
    );

    intervaloPomodoro = null;

});

document
.getElementById("reiniciar")
.addEventListener("click", () => {

    esDescanso = false;
    setActual = 1;

document.getElementById(
    "estadoPomodoro"
    ).textContent =
    "Estudio";
    clearInterval(
        intervaloPomodoro
    );

    intervaloPomodoro = null;

    pomodoroSegundos = 0;
    pomodoroMinutos = 25;
    pomodoroHoras = 0;

    tiempo.textContent =
        "00:25:00";

});

// ========================================
// PROGRESO
// ========================================

let objetivo = 60;

document
.getElementById("objetivoMinutos")
.textContent = objetivo;

const barraProgreso =
    document.getElementById(
        "barraProgreso"
    );

const porcentaje =
    document.getElementById(
        "porcentaje"
    );

function actualizarProgreso() {

    const completadas =
        tasks.filter(
            t => t.done
        ).length;

    document
    .getElementById(
        "contadorTareas"
    )
    .textContent = completadas;

    let progresoTotal = 0;

if (tasks.length > 0) {

    progresoTotal =
        (completadas / tasks.length) * 100;
}

    if (progresoTotal > 100) {
        progresoTotal = 100;
    }

    barraProgreso.value =
        progresoTotal;

    porcentaje.textContent =
        Math.floor(progresoTotal)
        + "%";
    if (progresoTotal >= 100) {

    clearInterval(intervaloPomodoro);

    intervaloPomodoro = null;

    alert(
    "Completaste todas las tareas."
);
}
}

// ========================================
// INICIO
// ========================================

render();
actualizarProgreso();