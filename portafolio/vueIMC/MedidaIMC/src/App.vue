<template>
  <div class="IMC">
    <div class="calculadora">
      <h1>Calculadora IMC</h1>

      <div class="formulario">
        <form @submit.prevent="calcularIMC">
          <div class="datosFormulario">
            <label for="nombre">Nombre: </label>
            <input
              type="text"
              v-model.trim="nombre"
              id="nombre"
              required
              placeholder="Ingresa tu nombre"
            />

            <label for="peso">Peso (kg): </label>
            <input
              type="number"
              v-model.number="peso"
              id="peso"
              required
              min="1"
              placeholder="Ej: 70"
            />

            <label for="altura">Altura (m): </label>
            <input
              type="number"
              v-model.number="altura"
              id="altura"
              required
              step="0.01"
              min="0.5"
              placeholder="Ej: 1.75"
            />
          </div>

          <button type="submit" style="margin-top: 18px">Calcular IMC</button>
        </form>
      </div>
    </div>

    <div class="resultado" v-if="resultado">
      <h2>Resultado</h2>
      <p :class="claseResultado">{{ resultado }}</p>

      <div v-if="imagenEstado" class="imagen-estado">
        <img :src="imagenEstado" :alt="estadoActual" />
      </div>

      <div class="tabla">
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Peso (kg)</th>
              <th>Altura (m)</th>
              <th>IMC</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(persona, index) in historial"
              :key="index"
              :class="claseFila(persona.estado)"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ persona.nombre }}</td>
              <td>{{ persona.peso }}</td>
              <td>{{ persona.altura }}</td>
              <td>{{ persona.imc.toFixed(2) }}</td>
              <td>{{ persona.estado }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nombre = ref("");
const peso = ref(null);
const altura = ref(null);
const resultado = ref("");
const estadoActual = ref("");
const historial = ref([]);
const claseResultado = ref("");
const imagenEstado = ref("");

const imagenes = {
  "Bajo peso": "https://tse2.mm.bing.net/th/id/OIP.Ft8DN533n-7xBhRiSOsC2wAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  "Normal": "https://img.freepik.com/vector-premium/ninos-dibujos-animados-lindo-ilustracion-vectorial-comprobando-su-peso-balanza_283146-38.jpg?w=2000",
  "Sobrepeso": "https://tse3.mm.bing.net/th/id/OIP.VfhlfLEgXagcprrLYkX9uwHaJe?rs=1&pid=ImgDetMain&o=7&rm=3",
  "Obesidad": "https://tse3.mm.bing.net/th/id/OIP.mj9Q-HsI4wStNIsW2YP1jgHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
};

function calcularIMC() {
  if (!nombre.value.trim()) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  if (!peso.value || peso.value <= 0) {
    alert("El peso debe ser mayor a 0.");
    return;
  }
  if (!altura.value || altura.value <= 0) {
    alert("La altura debe ser mayor a 0.");
    return;
  }

  const imc = peso.value / (altura.value * altura.value);
  let estado = "";

  if (imc < 18.5) estado = "Bajo peso";
  else if (imc < 24.9) estado = "Normal";
  else if (imc < 29.9) estado = "Sobrepeso";
  else estado = "Obesidad";

  estadoActual.value = estado;
  resultado.value = `${nombre.value}, tu IMC es ${imc.toFixed(2)}. Tu estado es ${estado}.`;

  if (estado === "Bajo peso") claseResultado.value = "bajo";
  else if (estado === "Normal") claseResultado.value = "normal";
  else if (estado === "Sobrepeso") claseResultado.value = "sobrepeso";
  else if (estado === "Obesidad") claseResultado.value = "obesidad";
  else claseResultado.value = "";

  imagenEstado.value = imagenes[estado] || "";

  historial.value.push({
    nombre: nombre.value,
    peso: peso.value,
    altura: altura.value,
    imc,
    estado,
  });

  nombre.value = "";
  peso.value = null;
  altura.value = null;
}

function claseFila(estado) {
  if (estado === "Bajo peso") return "fila-bajo";
  if (estado === "Normal") return "fila-normal";
  if (estado === "Sobrepeso") return "fila-sobrepeso";
  if (estado === "Obesidad") return "fila-obesidad";
  return "";
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  color: white;
  background-color: #1e1e1f;
  margin: 0;
  padding: 20px;
}

.calculadora {
  background-color: #141044;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid rgb(255, 255, 255);
}

.resultado{
  background-color: #141044;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid rgb(255, 255, 255);
}

.datosFormulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

input {
  width: 250px;
  height: 35px;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 150px;
  height: 40px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

th,
td {
  border: 1px solid #d5d5d5;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #141044;
  font-weight: bold;
}

.imagen-estado {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.imagen-estado img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: contain;
  background: white;
  padding: 5px;
}

.bajo {
  color: #eaff00;
}
.normal {
  color: #00ff88;
}
.sobrepeso {
  color: #ff8707;
}
.obesidad {
  color: #ff0000;
}

.fila-bajo {
  background-color: rgba(229, 255, 0, 0.2);
}
.fila-normal {
  background-color: rgba(9, 255, 0, 0.2);
}
.fila-sobrepeso {
  background-color: rgba(255, 140, 0, 0.2);
}
.fila-obesidad {
  background-color: rgba(255, 0, 0, 0.2);
}

.IMC{
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
