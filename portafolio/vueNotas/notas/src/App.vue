<template>
  <div class="evaluacion">
    <div class="contenedor">
      <h1>Evaluación del Rendimiento Estudiantil</h1>

      <div class="formulario">
        <form @submit.prevent="registrarEstudiante">
          <div class="campos">
            <label for="nombre">Nombre del Estudiante:</label>
            <input
              type="text"
              id="nombre"
              v-model.trim="nombre"
              placeholder="Ingresa el nombre"
              required
            />

            <label for="parcial">Nota del Parcial (0-100):</label>
            <input
              type="number"
              id="parcial"
              v-model.number="notaParcial"
              min="0"
              max="100"
              placeholder="Ej: 85"
              required
            />

            <label for="proyecto">Nota del Proyecto (0-100):</label>
            <input
              type="number"
              id="proyecto"
              v-model.number="notaProyecto"
              min="0"
              max="100"
              placeholder="Ej: 90"
              required
            />

            <label for="final">Nota Final (0-100):</label>
            <input
              type="number"
              id="final"
              v-model.number="notaFinal"
              min="0"
              max="100"
              placeholder="Ej: 95"
              required
            />
          </div>

          <button type="submit" class="btn-registrar">Registrar</button>
        </form>
      </div>
    </div>

    <div v-if="historial.length" class="tabla">
      <h2>Registro de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Estudiante</th>
            <th>Parcial</th>
            <th>Proyecto</th>
            <th>Final</th>
            <th>Promedio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(estudiante, index) in historial"
            :key="index"
            :class="claseFila(estudiante.estado)"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.parcial }}</td>
            <td>{{ estudiante.proyecto }}</td>
            <td>{{ estudiante.final }}</td>
            <td>{{ estudiante.promedio.toFixed(2) }}</td>
            <td>
              <span :class="['estado', claseEtiqueta(estudiante.estado)]">
                {{ estudiante.emoji }} {{ estudiante.estado }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nombre = ref("");
const notaParcial = ref(null);
const notaProyecto = ref(null);
const notaFinal = ref(null);
const resultado = ref("");
const estadoActual = ref("");
const historial = ref([]);
const claseResultado = ref("");
const imagenEstado = ref("");

function registrarEstudiante() {
  if (!nombre.value.trim()) {
    alert("Por favor, ingresa el nombre del estudiante.");
    return;
  }
  if (
    [notaParcial.value, notaProyecto.value, notaFinal.value].some(
      (n) => n === null || n < 0 || n > 100
    )
  ) {
    alert("Todas las notas deben estar en el rango de 0 a 100.");
    return;
  }

  const promedio =
    (notaParcial.value + notaProyecto.value + notaFinal.value) / 3;
  let estado = "";
  let emoji = "";

  if (promedio >= 90) {
    estado = "Sobresaliente";
    emoji = "🥇";
  } else if (promedio >= 70) {
    estado = "Aprobado";
    emoji = "✅";
  } else if (promedio >= 60) {
    estado = "Aceptable";
    emoji = "⚠";
  } else {
    estado = "Reprobado";
    emoji = "❌";
  }

  estadoActual.value = estado;
  resultado.value = `${nombre.value}, tu promedio es ${promedio.toFixed(
    2
  )}. Estado: ${estado}.`;

  if (estado === "Sobresaliente") claseResultado.value = "sobresaliente";
  else if (estado === "Aprobado") claseResultado.value = "aprobado";
  else if (estado === "Aceptable") claseResultado.value = "aceptable";
  else if (estado === "Reprobado") claseResultado.value = "reprobado";
  else claseResultado.value = "";

  historial.value.push({
    nombre: nombre.value,
    parcial: notaParcial.value,
    proyecto: notaProyecto.value,
    final: notaFinal.value,
    promedio,
    estado,
    emoji,
  });

  nombre.value = "";
  notaParcial.value = null;
  notaProyecto.value = null;
  notaFinal.value = null;
}

function claseFila(estado) {
  if (estado === "Sobresaliente") return "fila-sobresaliente";
  if (estado === "Aprobado") return "fila-aprobado";
  if (estado === "Aceptable") return "fila-aceptable";
  if (estado === "Reprobado") return "fila-reprobado";
  return "";
}

function claseEtiqueta(estado) {
  if (estado === "Sobresaliente") return "etiqueta-sobresaliente";
  if (estado === "Aprobado") return "etiqueta-aprobado";
  if (estado === "Aceptable") return "etiqueta-aceptable";
  if (estado === "Reprobado") return "etiqueta-reprobado";
  return "";
}
</script>

<style scoped>
.evaluacion {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f6f9;
  min-height: 100vh;
  padding: 40px 20px;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contenedor,
.tabla,
.resultado {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px 30px;
  width: 100%;
  max-width: 900px;
  text-align: center;
  margin-bottom: 30px;
}
h1,
h2 {
  color: #1a73e8;
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
label {
  text-align: left;
  font-weight: 600;
  color: #333;
}
input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}
input:focus {
  border-color: #1a73e8;
  outline: none;
}
.btn-registrar {
  margin-top: 18px;
  padding: 10px 20px;
  border: none;
  background: #1a73e8;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}
.btn-registrar:hover {
  background: #135ec7;
} /* Estados */
.sobresaliente,
.aprobado,
.aceptable,
.reprobado {
  color: #fff;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
}
.sobresaliente {
  background: #00c853;
}
.aprobado {
  background: #4caf50;
}
.aceptable {
  background: #ffeb3b;
  color: #333;
}
.reprobado {
  background: #f44336;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
th {
  background: #1a73e8;
  color: #fff;
}
tr:hover {
  background: #f5f5f5;
}
.fila-sobresaliente {
  background: rgba(0, 200, 83, 0.08);
}
.fila-aprobado {
  background: rgba(76, 175, 80, 0.08);
}
.fila-aceptable {
  background: rgba(255, 235, 59, 0.12);
}
.fila-reprobado {
  background: rgba(244, 67, 54, 0.12);
}
</style>