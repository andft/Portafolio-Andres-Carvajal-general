<template>
  <div class="fullscreen nombre flex flex-wrap  ">
    <q-card class="tarjetaBienvenida q-pa-xl">
      <div class="row no-wrap items-center centrado">
        <div class="column contenidoTarjeta">
          <div class="row justify-center items-center q-mb-sm">
            <q-icon
              name="sports_esports"
              size="40px"
              color="white"
              class="q-mr-sm"
            />
            <h4 class="titulo text-white text-center text-bold">
              ¡Bienvenido a bordo!
            </h4>
          </div>

          <p class="subtitulo text-white text-center q-mb-lg">
            Elige tu nombre o déjalo al azar
          </p>

          <hr class="separador" />

          <q-input
            v-model="nombre"
            placeholder="Escribe tu nombre aquí..."
            rounded
            outlined
            class="campoNombre q-mb-lg"
            bg-color="white"
            clearable
          >
            <template #prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>

          <div class="row justify-center q-gutter-md">
            <button class="continuar" @click="irCategorias">Continuar</button>

            <button class="botonAleatorio" @click="generarAleatorio">
              Nombre aleatorio
            </button>
          </div>

          <p class="texto text-center text-white q-mt-md">
            Un nombre alocado el cual te va a representar.
          </p>
        </div>
      </div>
    </q-card>

    <img :src="confundido" alt="muñeco" class="personaje" />
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import confundido from "../assets/nombre.png";
import { nombres as listaNombres } from "../data/datos.js";

const router = useRouter();
const $q = useQuasar();

const nombre = ref("");

const generarAleatorio = () => {
  nombre.value = listaNombres[Math.floor(Math.random() * listaNombres.length)];
};

const irCategorias = () => {
  const nombreLimpio = nombre.value.trim();

  if (!nombreLimpio) {
    return $q.notify({
      type: "negative",
      icon: "warning",
      message: "Debes escribir un nombre para continuar.",
    });
  }

  let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

  const existe = jugadores.some(
    (j) => j.nombre.toLowerCase() === nombreLimpio.toLowerCase()
  );

  if (existe) {
    return $q.notify({
      type: "negative",
      icon: "error",
      message: "Ese nombre ya está en uso. Intenta otro.",
    });
  }

  const nuevoJugador = {
    id: crypto.randomUUID(),
    nombre: nombreLimpio,
  };

  jugadores.push(nuevoJugador);
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
  localStorage.setItem("jugadorActual", nuevoJugador.id);

  router.push("/categoria");
};
</script>

<style scoped>
.nombre {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/fondoInicio.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personaje {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.tarjetaBienvenida {
  width: 600px;
  max-width: 95vw;
  border-radius: 22px;
  padding: 25px 35px;

  background: linear-gradient(135deg, #0b68b7, #084c8f);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.titulo {
  font-size: 26px;
  margin: 15px 0 5px 0;
}

.subtitulo {
  font-size: 17px;
  opacity: 0.9;
  margin: 0;
}

.separador {
  border: none;
  border-top: 2px solid white;
  width: 85%;
  margin: 12px auto;
}

.campoNombre {
  background: white;
  border-radius: 40px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.botonAleatorio {
  background: linear-gradient(135deg, #ff8800, #ff8229);
  box-shadow: 0px 4px 0px #cd7b00;
  color: white;
  padding: 10px 18px;
  font-family: "Comic Sans MS", cursive, sans-serif;
  border-radius: 12px;
}

.continuar {
  background: #00ff1a;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 12px 28px;
  border-radius: 12px;
  cursor: pointer;
  font-family: "Comic Sans MS", cursive, sans-serif;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px #00000055;

  box-shadow: 0px 4px 0px #00ca07;
  transition: transform 0.1s, box-shadow 0.1s;
}

.continuar:active {
  transform: translateY(3px);
  box-shadow: 0px 1px 0px #00c324;
}

.continuar:hover {
  filter: brightness(1.1);
}

.texto {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>

