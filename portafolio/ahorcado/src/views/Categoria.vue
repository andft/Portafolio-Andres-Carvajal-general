<template>
  <div class="categorias row justify-center items-center q-pa-lg">
    <img :src="categorias" alt="muñeco" class="personaje" />
    <q-card class="cardCategorias q-pa-xl">
      <h3 class="titulo text-white text-center q-mb-xl">ELIGE UNA CATEGORÍA</h3>

      <hr class="separador">

      <div class="botones">
        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'animales' }"
          label="🐵 ANIMALES"
          @click="seleccionar('animales')"
        />

        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'paises' }"
          label="🌎 PAÍSES"
          @click="seleccionar('paises')"
        />

        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'transportes' }"
          label="🚌 TRANSPORTES"
          @click="seleccionar('transportes')"
        />

        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'alimentos' }"
          label="🍎 ALIMENTOS"
          @click="seleccionar('alimentos')"
        />

        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'deportes' }"
          label="⚽ DEPORTES"
          @click="seleccionar('deportes')"
        />

        <q-btn
          class="botonCategoria"
          :class="{ activo: categoriaSeleccionada === 'peliculas' }"
          label="🎞️ PELÍCULAS"
          @click="seleccionar('peliculas')"
        />
      </div>

      <div class="row justify-center q-mt-lg">
        <button class="continuar" @click="irNivel">Continuar</button>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import categorias from "../assets/categorias.png";

const router = useRouter();

const categoriaSeleccionada = ref(null);

const seleccionar = (categoria) => {
  categoriaSeleccionada.value = categoria;
};

const irNivel = () => {
  if (!categoriaSeleccionada.value) return;

  let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

  const idActual = localStorage.getItem("jugadorActual");

  const jugador = jugadores.find((j) => j.id === idActual);

  if (jugador) {
    jugador.categoria = categoriaSeleccionada.value;
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
  }

  router.push("/nivel");
};
</script>

<style scoped>
.categorias {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/fondoInicio.png");
  overflow-y: auto;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.personaje {
  width: 300px;
  margin-right: 20px;
}

.cardCategorias {
  width: 650px;
  border-radius: 32px;
  background: linear-gradient(180deg, #1e8fff, #0057a1 75%);
  border: 2px solid rgba(255, 255, 255, 0.25);
  padding: 35px 40px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  animation: fadeIn 0.6s ease-out;
}

.separador {
  border: none;
  border-top: 2px solid white;
  width: 85%;
  margin: 20px auto;
}

.titulo {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 4px #0004;
  margin-bottom: 28px;
}

.botones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
}

.botonCategoria {
  padding: 16px 0;
  font-size: 18px;
  font-weight: 700;
  border-radius: 18px;
  color: white;
  background: linear-gradient(92deg, #ff8a00, #ff5c00);
  text-shadow: 1px 1px 3px #00000055;
  box-shadow: 0px 4px 0px #00000033;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
}

.botonCategoria:hover {
  transform: translateY(-3px);
  box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.4);
}

.botonCategoria.activo {
  background: linear-gradient(92deg, #21c45d, #0fa144);
  box-shadow: 0px 4px 10px #0d8d3eaa;
  transform: scale(1.03);
}

.continuar {
  display: block;
  margin: 30px auto 0;

  background: linear-gradient(90deg, #4fd25c, #36b84a);
  color: white;

  padding: 12px 35px;
  font-size: 17px;
  font-weight: 700;

  border-radius: 12px;
  border: none;
  cursor: pointer;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);

  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.continuar:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.25);
}

.continuar:active {
  transform: translateY(0);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
}

</style>
