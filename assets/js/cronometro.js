let segundos = 0;
let minutos = 25;
let horas = 0;

let intervalo = null;

const tiempo = document.getElementById("tiempo");

function actualizarCronometro() {

    segundos--;

    if (segundos == -1) {
        segundos = 59
        minutos--;
    }
    if (minutos == -1) {
        // minutos = 59;
        // horas--;
        clearInterval(intervalo);
        minutos = 0;
        segundos = 0;
    }

    let h = horas.toString().padStart(2, "0");
    let m = minutos.toString().padStart(2, "0");
    let s = segundos.toString().padStart(2, "0");
// ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥ 
    tiempo.textContent = `${h}:${m}:${s}`;
}

document.getElementById("iniciar").addEventListener("click", () => {
    
    if (intervalo === null) {
        intervalo = setInterval(actualizarCronometro, 1000);
    }

    if (segundos == 0 && minutos == 0 && horas == 0) {
        // clearInterval(intervalo);
        intervalo = null;
        segundos = 0;
        minutos = 10;
        horas = 0;
    }
});

document.getElementById("pausar").addEventListener("click", () => {

    clearInterval(intervalo);
    intervalo = null;

});

document.getElementById("reiniciar").addEventListener("click", () => {

    clearInterval(intervalo);

    intervalo = null;
    segundos = 0;
    minutos = 25;
    horas = 0;

    tiempo.textContent = "00:25:00";

});

