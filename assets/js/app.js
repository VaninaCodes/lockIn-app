// Objetivo de estudio (en minutos)
let objetivo = 60;

document.getElementById("objetivoMinutos").textContent = objetivo;

let segundos = 0;

const cronometro = document.getElementById("cronometro");
const minutosActuales = document.getElementById("minutosActuales");
const barraProgreso = document.getElementById("barraProgreso");
const porcentaje = document.getElementById("porcentaje");

setInterval(() => {
    segundos++;
    
    let minutos = Math.floor(segundos / 60);
    let seg = segundos % 60;

    cronometro.textContent = 
        String(minutos).padStart(2,"0") + 
        ":" +
        String(seg).padStart(2, "0");
    minutosActuales.textContent = minutos;

    let progreso = (minutos / objetivo) * 100;

    if (progreso > 100){
        progreso = 100;
    }

    barraProgreso.value = progreso;
    porcentaje.textContent = Math.floor(progreso) + "%";
}, 1000);
// Contador de tareas
let tareasFinalizadas = 0;

function completarTarea() {
    tareasFinalizadas ++;
    document.getElementById("contadorTareas").textContent = 
        tareasFinalizadas;
}