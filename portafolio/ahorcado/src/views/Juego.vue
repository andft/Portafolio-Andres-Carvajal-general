<template>
  <div class="fullscreen juego flex flex-center">
    <nav class="navBar row justify-between items-center q-pa-md">
      <div class="jugador text-white text-bold">👤 {{ nombreJugador }}</div>

      <div class="vidas text-white text-bold">
        ❤️ {{ vidas }} / {{ vidasMax }}
      </div>

      <div class="tiempo text-white text-bold">⏱ {{ tiempo }} s</div>
    </nav>

    <div class="juegoAhorcado">
      <div class="cardAhorcado">
        <img :src="imagenAhorcado" alt="ahorcado" class="ahorcado-img" />
      </div>
      <q-card class="cardPalabra q-pa-xl">
        <div class="column items-center">
          <h2 class="titulo text-white text-bold q-mb-md">
            ¡ADIVINA LA PALABRA!
          </h2>

          <div class="row justify-center q-mb-md letras">
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
                class="botonLetra"
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
                class="botonLetra"
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
                class="botonLetra"
                :color="colorLetra(letra)"
                @click="seleccionar(letra)"
                :disable="yaUsada(letra)"
              />
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="modalGanar" persistent>
      <q-card class="modalInfoJuego modalGanar q-pa-xl">
        <h4 class="tituloModal text-center">¡GANASTE! 🎉</h4>

        <p class="textoModal text-center">
          Has adivinado la palabra: <b>{{ palabra }}</b>
        </p>

        <div class="row justify-center q-mt-lg botonesModal">
          <q-btn
            color="green"
            label="Jugar otra vez"
            to="/categoria"
            rounded
            unelevated
          />

          <q-btn
            label="Record"
            color="blue"
            rounded
            unelevated
            to="/record"
          />

          <q-btn
            label="Salir"
            color="orange"
            rounded
            unelevated
            to="/inicio"
          />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalPerder" persistent>
      <q-card class="modalInfoJuego modalPerder q-pa-xl">
        <h4 class="tituloModal text-center">¡PERDISTE! 😢</h4>

        <p class="textoModal text-center">
          La palabra era: <b>{{ palabra }}</b>
        </p>

        <div class="row justify-center q-mt-lg botonesModal">
          <q-btn
            color="red"
            label="Intentar de nuevo"
            to="/categoria"
            rounded
            unelevated
          />

          <q-btn
            label="Record"
            color="blue"
            rounded
            unelevated
            class="botonRecord"
            to="/record"
          />

          <q-btn
            label="Salir"
            color="orange"
            rounded
            unelevated
            class="botonSalir"
            to="/inicio"
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

const tiempo = ref(0);
let intervalo = null;

watch(palabraEstado, () => {
  if (!intervalo) {
    intervalo = setInterval(() => {
      tiempo.value++;
    }, 1000);
  }
});

watch([modalGanar, modalPerder], ([gana, pierde]) => {
  if (gana || pierde) {
    clearInterval(intervalo);
    intervalo = null;

    guardarRecord();
  }
});

// Guardar record en localStorage
const guardarRecord = () => {
  const lista = JSON.parse(localStorage.getItem("jugadores")) || [];

  const index = lista.findIndex((j) => j.id === idActual);
  if (index !== -1) {
    lista[index].tiempo = tiempo.value;
  }

  localStorage.setItem("jugadores", JSON.stringify(lista));
};
</script>

<style scoped>
.juego {
  background-image: url("../assets/fondoInicio.png");
  background-size: cover;
  background-position: center;
  overflow-y: auto;
}

.navBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

h2{
  margin: 0;
} 

.jugador,
.vidas {
  font-size: 18px;
}

.tiempo {
  font-size: clamp(16px, 2vw, 22px);
  margin-bottom: 10px;
}

.juegoAhorcado {
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 70px 20px 20px 20px;
  gap: 20px;
}

.cardAhorcado {
  width: 100%;
  max-width: 300px;
  padding: 15px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  backdrop-filter: blur(6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
}

.ahorcado-img {
  width: 100%;
  height: auto;
  object-fit: contain;

  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
}

.cardPalabra {
  width: 750px;
  max-width: 95vw;
  border-radius: 25px;
  background: linear-gradient(135deg, #0b68b7, #084c8f);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);

  display: flex;
  justify-content: center;
  align-items: center;
}

.cardPalabra .column {
  width: 100%;
  text-align: center;
}

.letras {
  flex-wrap: wrap;
  gap: 10px;
}

.letra {
  font-size: 32px;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
}

.teclado {
  width: 100%;
  max-width: 600px;
}

.botonLetra {
  width: 42px;
  height: 42px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
}

.titulo {
  font-size: 30px;
}

.categoria {
  font-size: clamp(14px, 2.5vw, 22px);
}

/* modal Informacion del juego */
.modalInfoJuego {
  width: 350px;
  max-width: 90vw;
  border-radius: 22px;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 25px #00000050;
  border: 2px solid #ffffff50;
}

.modalGanar {
  background: linear-gradient(160deg, #2ecc70cc, #1f9e52cc);
  border-color: #b0ffcc;
}

.tituloModal {
  color: white;
  font-size: 28px;
  font-weight: 800;
  text-shadow: 0 0 5px #ffffff;
}

.modalPerder {
  background: linear-gradient(160deg, #ff4a4acc, #c71b1bcc);
  border-color: #ffb5b5;
}

.textoModal {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin-top: 8px;
}

.botonesModal {
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 18px;
  width: 100%;
}

.botonesModal .q-btn {
  width: 180px;  
  justify-content: center;
  text-align: center;
}

/* media */

@media (max-width: 600px) {
  .cardPalabra {
    padding: 20px !important;
  }

  .botonLetra {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .letra {
    font-size: 26px;
  }
}

@media (max-width: 380px) {
  .botonLetra {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }

  .letra {
    font-size: 22px;
  }
}
</style>
