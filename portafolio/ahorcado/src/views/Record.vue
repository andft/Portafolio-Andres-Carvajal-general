<template>
  <div class="contenedorRecords">
    <div class="accionesRecords">
      <q-btn
        class="botonJugar"
        label="Jugar"
        rounded
        unelevated
        to="/categoria"
      />

      <q-btn class="botonSalir" label="Salir ✖" rounded unelevated to="/inicio" />
    </div>

    <div class="cardRecord">
      <div class="headerRecord">
        <span class="icono">🥇</span>
        <h2>Top 3 - Fácil</h2>
      </div>

      <ul class="listaTop">
        <li v-for="(jug, index) in topFacil" :key="'f' + index">
          <span class="posicion">#{{ index + 1 }}</span>
          <span class="nombre">{{ jug.nombre }}</span>
          <span class="tiempo">{{ jug.tiempo }}s</span>
        </li>
      </ul>
    </div>

    <div class="cardRecord">
      <div class="headerRecord">
        <span class="icono">🥈</span>
        <h2>Top 3 - Normal</h2>
      </div>

      <ul class="listaTop">
        <li v-for="(jug, index) in topNormal" :key="'n' + index">
          <span class="posicion">#{{ index + 1 }}</span>
          <span class="nombre">{{ jug.nombre }}</span>
          <span class="tiempo">{{ jug.tiempo }}s</span>
        </li>
      </ul>
    </div>

    <div class="cardRecord">
      <div class="headerRecord">
        <span class="icono">🥉</span>
        <h2>Top 3 - Difícil</h2>
      </div>

      <ul class="listaTop">
        <li v-for="(jug, index) in topDificil" :key="'d' + index">
          <span class="posicion">#{{ index + 1 }}</span>
          <span class="nombre">{{ jug.nombre }}</span>
          <span class="tiempo">{{ jug.tiempo }}s</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

const jugadoresFacil = jugadores.filter((j) => Number(j.nivel) === 1);
const jugadoresNormal = jugadores.filter((j) => Number(j.nivel) === 2);
const jugadoresDificil = jugadores.filter((j) => Number(j.nivel) === 3);

const topFacil = computed(() =>
  [...jugadoresFacil]
    .filter((j) => j.tiempo !== undefined)
    .sort((a, b) => a.tiempo - b.tiempo)
    .slice(0, 3)
);

const topNormal = computed(() =>
  [...jugadoresNormal]
    .filter((j) => j.tiempo !== undefined)
    .sort((a, b) => a.tiempo - b.tiempo)
    .slice(0, 3)
);

const topDificil = computed(() =>
  [...jugadoresDificil]
    .filter((j) => j.tiempo !== undefined)
    .sort((a, b) => a.tiempo - b.tiempo)
    .slice(0, 3)
);
</script>

<style scoped>
.contenedorRecords {
  width: 100%;
  min-height: 100vh;

  background: url("../assets/fondoInicio.png") center/cover no-repeat;

  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
  justify-content: center;

  color: white;
  text-align: center;
  padding: 30px 15px;
}

.icono {
  font-size: 34px;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.35));
  user-select: none;
}

.contenedorRecords h2 {
  font-size: 28px;
  margin: 25px 0 15px;

  background: rgba(0, 0, 0, 0.35);
  padding: 8px 20px;
  border-radius: 12px;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}

.cardRecord {
  width: 280px;
  padding: 18px 20px;

  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.cardRecord:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
}

.listaTop {
  width: 95%;
  max-width: 480px;
  list-style: none;
  padding: 0;
  margin-bottom: 35px;
}

.listaTop li {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 20px;
  margin-bottom: 14px;

  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px;

  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);

  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.listaTop li:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
}

.listaTop li span:first-child {
  font-size: 20px;
  font-weight: bold;
  color: #ffe66d;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.listaTop li span:nth-child(2) {
  flex: 1;
  text-align: center;

  font-size: 19px;
  font-weight: 700;
  color: white;

  text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}

.listaTop li span:last-child {
  font-size: 19px;
  font-weight: bold;
  color: #8affc7;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

.accionesRecords {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 25px;
}

.botonJugar {
  background-color: #28c76f;
  color: #ffffff;
  padding: 12px 26px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0px 4px 0px #00000033;
}

.botonJugar:hover {
  background-color: #34d97e;
  transform: translateY(-2px);
  box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.35);
}

.botonJugar:active {
  transform: scale(0.97);
}

.botonSalir {
  background-color: #e53935;
  color: #ffffff;
  padding: 12px 26px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: 0px 4px 0px #00000033;
}

.botonSalir:hover {
  background-color: #ef4a47;
  transform: translateY(-2px);
  box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.35);
}

.botonSalir:active {
  transform: scale(0.97);
}
</style>
