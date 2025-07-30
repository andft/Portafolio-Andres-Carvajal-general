import { Operadores } from "./operadores.js";

const inputNum1 = document.getElementById("input1");
const inputNum2 = document.getElementById("input2");
const boton = document.getElementById("botonResultado");
const mostrarResultado = document.getElementById("resultado")

boton.addEventListener("click", () => {
    const num1 = parseInt(inputNum1.value);
    const num2 = parseInt(inputNum2.value);

    const inputRadio = document.querySelector('input[name="operador"]:checked');
    const selector = inputRadio.value;

    if (!inputRadio) {
        mostrarResultado.textContent = "Seleccione una operación.";
        return;
    }

    if (selector === 'suma') {
        mostrarResultado.textContent = "Resultado: " + Operadores.suma(num1, num2);
    } else if (selector === 'resta') {
        mostrarResultado.textContent = "Resultado: " + Operadores.resta(num1, num2);
    } else if (selector === 'multiplicacion') {
        mostrarResultado.textContent = "Resultado: " + Operadores.multiplicacion(num1, num2);
    } else if (selector === 'division') {
        mostrarResultado.textContent = "Resultado: " + Operadores.division(num1, num2);
    }
});