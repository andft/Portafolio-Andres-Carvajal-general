<template>
  <div class="containerAhorcado">
    <img :src="titulo" alt="titulo" class="titulo" />

    <div class="contenido">
      <img :src="muneco" alt="muñeco" class="personaje" />

<div class="cajaIntro text-white">
  <div class="cardHeader">
    <div class="tituloIntro">INTRODUCCIÓN</div>
  </div>

  <div class="cardContent">
    Adivina la palabra antes de que el monigote tenga un mal día. Cada
    error lo acerca al desastre y cada acierto le da esperanza. ¡Piensa
    bien tus letras, su destino está en tus manos!
  </div>
</div>
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

<style >
.containerAhorcado {
  min-height: 100vh;
  background-image: url("../assets/fondoInicio.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;

  padding: 20px;
  overflow-y: auto;   
}

.tituloIntro {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.35);
}

.cardContent {
  font-size: 16px;
  line-height: 1.6;
  color: #cce0ff; /* azul suave para texto */
}


.titulo {
  width: 90%;
  max-width: 500px;
  height: auto;
  min-width: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.contenido {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.personaje {
  width: 260px;
  max-width: 90%;
  min-width: 150px;
  margin-right: 20px;
  display: block;
}

.cajaIntro {
  max-width: 500px;                
  margin: 20px auto;               
  border-radius: 18px;             
  box-shadow: 0 8px 22px rgba(0,0,0,0.35); 
  overflow: hidden;                
  text-align: center;
  padding: 20px;

  /* gradiente azul más claro */
  background: linear-gradient(135deg, #2a4d8f 0%, #3b69b1 50%, #4d82d3 100%);
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}

.cajaIntro:hover {
  transform: translateY(-4px); 
  box-shadow: 0 12px 28px rgba(0,0,0,0.45); 
}

.cardContent {
  padding: 10px 0; 
}

.cardHeader {
  margin-bottom: 10px; 
}

.tituloIntro {
  font-size: 18px;
}

.botones {
  display: grid;
  justify-content: center;
  margin-top: 25px;
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
