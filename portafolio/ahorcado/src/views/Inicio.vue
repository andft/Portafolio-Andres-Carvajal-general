<template>
  <div class="hangmanContainer">
    <img :src="titulo" alt="titulo" />

    <div class="contenido">
      <img :src="muneco" alt="muñeco" class="personaje" />

      <q-card
        class="my-card text-white cajaIntro"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6 tituloIntro">INTRODUCCIÓN</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Tu misión es adivinar la palabra antes de que nuestro pobre monigote
          tenga un mal día. ¡Piensa bien cada letra, su vida depende de tu
          ortografía! Cada error lo acerca al desastre, pero cada acierto le
          devuelve la esperanza. Prepárate: podría sobrevivir… o terminar peor
          por tus decisiones.
        </q-card-section>
      </q-card>
    </div>
    <div class="botones">
      <button class="btn jugar" @click="irNombre">JUGAR</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import muneco from "../assets/muneco.png";
import titulo from "../assets/titulo.png";
import fondoInicio from "../assets/fondoInicio.png";

const router = useRouter();

const irNombre = () => {
  router.push("/nombre");
};
</script>

<style scoped>
.hangmanContainer {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/fondoInicio.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  padding-top: 20px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

img {
  width: 600px;
}

.titulo {
  font-size: 60px;
  font-weight: bold;
  color: #ffdd00;
}

.subtitulo {
  font-size: 35px;
  margin-top: -10px;
}

.contenido {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.contenido img {
  width: 280px;
}

.personaje {
  width: 180px;
  margin-right: 20px;
}

.cajaIntro {
  background: #ffffff33;
  padding: 10px;
  border-radius: 10px;
  width: 350px;
  backdrop-filter: blur(3px);
}

.tituloIntro {
  font-size: 18px;
}

.botones {
  margin-top: 25px;
  display: flex;
  gap: 15px;
}

.btn {
  padding: 10px 25px;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.jugar {
  background: #ff9b00;
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: "Comic Sans MS", cursive, sans-serif;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px #00000055;

  box-shadow: 0px 4px 0px #c67600;
  transition: transform 0.1s, box-shadow 0.1s;
}

.jugar:active {
  transform: translateY(3px);
  box-shadow: 0px 1px 0px #c67600;
}

.jugar:hover {
  filter: brightness(1.1);
}
</style>
