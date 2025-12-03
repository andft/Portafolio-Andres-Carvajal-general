<template>
  <div class="fullscreen bg-main flex">
    <nav class="navBar row justify-between items-center q-pa-md">
      <div class="jugador text-white text-bold">👤 {{ nombreJugador }}</div>

      <div class="vidas text-white text-bold">
        ❤️ {{ vidas }} / {{ vidasMax }}
      </div>
    </nav>
    <div class="containerAhorcado">
      <div class="ahorcado-container">
        <img :src="imagenAhorcado" alt="ahorcado" class="ahorcado-img" />
      </div>

      <!-- 🔵 TARJETA DEL JUEGO -->
      <q-card class="gameCard q-pa-xl">
        <div class="column items-center">
          <h2 class="titulo text-white text-bold q-mb-md">
            ¡ADIVINA LA PALABRA!
          </h2>

          <div class="row justify-center q-mb-md letrasRow">
            <span
              v-for="(letra, index) in palabraEstado"
              :key="index"
              class="letra"
            >
              {{ letra }}
            </span>
          </div>

          <div class="categoria text-white q-mb-md">
            Categoría: <b>{{ categoria }}</b>
          </div>

          <div class="teclado">
            <div class="row justify-center q-gutter-sm q-mb-sm">
              <q-btn
                v-for="letra in fila1"
                :key="letra"
                :label="letra"
                class="btnLetra"
                :color="colorLetra(letra)"
                @click="seleccionar(letra)"
                :disable="yaUsada(letra)"
              />
            </div>

            <div class="row justify-center q-gutter-sm q-mb-sm">
              <q-btn
                v-for="letra in fila2"
                :key="letra"
                :label="letra"
                class="btnLetra"
                :color="colorLetra(letra)"
                @click="seleccionar(letra)"
                :disable="yaUsada(letra)"
              />
            </div>

            <div class="row justify-center q-gutter-sm">
              <q-btn
                v-for="letra in fila3"
                :key="letra"
                :label="letra"
                class="btnLetra"
                :color="colorLetra(letra)"
                @click="seleccionar(letra)"
                :disable="yaUsada(letra)"
              />
            </div>
          </div>

          <div class="row justify-center q-gutter-md q-mt-xl">
            <q-btn
              label="Record"
              color="blue"
              rounded
              unelevated
              class="botonPista"
              to="/record"
            />

            <q-btn
              label="Iniciar"
              color="orange"
              rounded
              unelevated
              class="botonSalir"
              to="/inicio"
            />
          </div>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="modalGanar">
      <q-card class="modal-card win-modal q-pa-xl">
        <h4 class="titulo-ganar text-center">¡GANASTE! 🎉</h4>

        <p class="texto-modal text-center">
          Has adivinado la palabra: <b>{{ palabra }}</b>
        </p>

        <div class="row justify-center q-mt-lg">
          <q-btn
            color="green"
            label="Jugar otra vez"
            to="/categoria"
            rounded
            unelevated
          />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalPerder">
      <q-card class="modal-card lose-modal q-pa-xl">
        <h4 class="titulo-perder text-center">¡PERDISTE! 😢</h4>

        <p class="texto-modal text-center">
          La palabra era: <b>{{ palabra }}</b>
        </p>

        <div class="row justify-center q-mt-lg">
          <q-btn
            color="red"
            label="Intentar de nuevo"
            to="/categoria"
            rounded
            unelevated
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import { ref, computed, watch } from "vue";
import { categorias } from "../data/datos.js";

const imagenAhorcado = computed(() => {
  return new URL(
    `../assets/ahorcado/ahorcado_${vidas.value}.png`,
    import.meta.url
  ).href;
});

const idActual = localStorage.getItem("jugadorActual");
const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
const jugador = jugadores.find((j) => j.id === idActual);

const categoriaSeleccionada = jugador?.categoria;
const nivelSeleccionado = Number(jugador?.nivel);
const nombreJugador = jugador?.nombre || "Jugador";

const categoriaData = categorias.find(
  (cat) => cat.nombre === categoriaSeleccionada
);

const nivelData = categoriaData?.niveles.find(
  (niv) => niv.nivel === nivelSeleccionado
);

const vidasMax = 7;

const palabras = nivelData?.palabras || ["palabra"];
const palabra =
  palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();

const categoria = categoriaSeleccionada?.toUpperCase() || "CATEGORÍA";

const vidas = ref(vidasMax);
const usadas = ref([]);

const fila1 = ["A", "B", "C", "D", "E", "F", "G"];
const fila2 = ["H", "I", "J", "K", "L", "M", "N", "Ñ", "O"];
const fila3 = ["P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const palabraEstado = computed(() =>
  palabra.split("").map((letra) => (usadas.value.includes(letra) ? letra : "_"))
);

const modalGanar = ref(false);
const modalPerder = ref(false);

const palabraCompleta = computed(
  () => palabraEstado.value.join("") === palabra
);

watch(palabraCompleta, (nueva) => {
  if (nueva) modalGanar.value = true;
});

watch(vidas, (n) => {
  if (n <= 0) modalPerder.value = true;
});

const yaUsada = (letra) => usadas.value.includes(letra);

const colorLetra = (letra) => {
  if (!usadas.value.includes(letra)) return "green";
  return palabra.includes(letra) ? "green-8" : "red";
};

const seleccionar = (letra) => {
  if (yaUsada(letra)) return;

  usadas.value.push(letra);

  if (!palabra.includes(letra)) vidas.value--;
};
</script>

<style scoped>
.bg-main {
  background: radial-gradient(circle at center, #0a4c8b, #043a6b);
  background-image: url("../assets/fondoInicio.png");
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.containerAhorcado{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
}

.gameCard {
  width: 750px;
  max-width: 95vw;
  border-radius: 25px;
  background: linear-gradient(135deg, #0b68b7, #084c8f);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
}

.titulo {
  font-size: 30px;
}

.letrasRow .letra {
  font-size: 32px;
  margin: 0 6px;
  color: white;
  border-bottom: 3px solid white;
  padding: 4px 6px;
  width: 32px;
  text-align: center;
}

.categoria {
  font-size: 18px;
}

.btnLetra {
  font-size: 18px;
  padding: 10px 14px;
  width: 45px;
  font-weight: bold;
  border-radius: 10px;
}

.botonPista {
  width: 130px;
  font-size: 18px;
}

.botonSalir {
  width: 130px;
  font-size: 18px;
  background: linear-gradient(135deg, #ffa033, #ff6b00) !important;
  color: white;
}

.navBar {
  width: 100%;
  height: 10vh;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

.jugador,
.vidas {
  font-size: 18px;
}

.modal-card {
  width: 350px;
  max-width: 90vw;
  border-radius: 22px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 25px #00000050;
  border: 2px solid #ffffff50;
}

.win-modal {
  background: linear-gradient(160deg, #2ecc70cc, #1f9e52cc);
  border-color: #b0ffcc;
}

.titulo-ganar {
  color: white;
  font-size: 28px;
  font-weight: 800;
  text-shadow: 0 0 5px #ffffff;
}

.lose-modal {
  background: linear-gradient(160deg, #ff4a4acc, #c71b1bcc);
  border-color: #ffb5b5;
}

.titulo-perder {
  color: white;
  font-size: 28px;
  font-weight: 800;
  text-shadow: 0 0 5px #ffffff;
}

.texto-modal {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin-top: 8px;
}

.ahorcado-container {
  width: 100%;
  max-width: 350px;
  padding: 15px;
  margin: 0 40px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.15),
    rgba(0, 0, 0, 0.15)
  );
}

.ahorcado-img {
  width: 100%;
  height: auto;
  object-fit: contain;

  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}
</style>
