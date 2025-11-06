<template>
  <div class="appPokemon">
    <nav>
      <div class="nombrePag">
        <img
          src="https://cdn-icons-png.flaticon.com/512/361/361998.png"
          alt="logo"
          style="width: 40px; height: 40px"
        />
        <h2>Pokemon</h2>
      </div>
      <div class="busqueda">
        <div>Inicio</div>
        <div>
          <input
            v-model="nombre"
            type="text"
            placeholder="Busca tu pokemon"
            id="pokemon"
          />
   <button @click="buscarPokemon" class="input-img">
  <img :src="'https://cdn-icons-png.flaticon.com/512/622/622669.png'" :alt="imgLupa" />
</button>
        </div>
      </div>
    </nav>

    <section>
      <div
        class="infoPokemon"
        v-if="pokemonData"
        :style="{
          border: '6px solid ' + generarColorFondo(pokemonData.types),
          borderImage: generarColorFondo(pokemonData.types),
          borderImageSlice: 1,
        }"
      >
        <div class="imagen">
          <div class="habitad" :style="{ 'background-image': `url(${obtenerTipo(pokemonData.types[0].type.name).fondo})` }">
            <img
              :src="pokemonData.sprites.other['official-artwork'].front_default"
              alt="pokemon"
            />
          </div>
          <h2>{{ pokemonData.name }}</h2>
        </div>
        <div class="datos">
          <h3>Tipo:</h3>
          <div class="tipos">
            <div
              class="tipo"
              v-for="(tipo, i) in pokemonData.types"
              :key="i"
              :style="{
                backgroundColor: obtenerTipo(tipo.type.name).color,
              }"
            >
              <img
                :src="obtenerTipo(tipo.type.name).imagen"
                :alt="tipo.type.name"
              />
              <p>{{ tipo.type.name }}</p>
            </div>
          </div>
          <hr />
          <h3>Debilidades:</h3>
          <div class="debilidades">
            <div class="tipos">
              <div
                class="tipo"
                v-for="(debilidad, i) in debilidades"
                :key="i"
                :style="{
                  backgroundColor: obtenerTipo(debilidad.name).color,
                }"
              >
                <img
                  :src="obtenerTipo(debilidad.name).imagen"
                  alt="debilidad"
                />
                <p>{{ debilidad.name }}</p>
              </div>
            </div>
          </div>
          <hr />
          <h3>Datos Fisicos:</h3>
          <div class="info">
            <p>Altura: {{ pokemonData.height / 10 }} m</p>
            <p>Peso: {{ pokemonData.weight / 10 }} kg</p>
          </div>
        </div>
        <div class="separador"></div>
        <div class="habilidades">
          <h3>Habilidades:</h3>
          <div class="stat" v-for="(stat, i) in pokemonData.stats" :key="i">
            <span class="nombre-stat">{{ stat.stat.name }}</span>
            <div class="barra-animada">
              <div
                class="relleno-animado"
                :style="{
                  width: stat.base_stat + '%',
                  background: `linear-gradient(270deg, ${
                    obtenerTipo(pokemonData.types[0].type.name).color
                  }, #ffffff, ${
                    obtenerTipo(pokemonData.types[0].type.name).color
                  })`,
                }"
              ></div>
            </div>
            <span class="valor">{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const url = "https://pokeapi.co/api/v2/pokemon/";
const nombre = ref("");
const error = ref(null);
const pokemonData = ref(null);
const debilidades = ref([]);

async function buscarPokemon() {
  if (!nombre.value) {
    error.value = "Por favor ingresa el nombre de un Pokémon";
    return;
  }

  try {
    const resPokemon = await axios.get(`${url}${nombre.value.toLowerCase()}`);
    pokemonData.value = resPokemon.data;
    error.value = null;

    const tipoUrl = pokemonData.value.types[0].type.url;
    const resTipo = await axios.get(tipoUrl);

    debilidades.value = resTipo.data.damage_relations.double_damage_from;
  } catch (error) {
    error.value = "No se encontró el Pokémon. Intenta con otro nombre.";
    pokemonData.value = null;
    debilidades.value = [];
  }
}

function obtenerTipo(type) {
  const coloresTipo = {
    steel: "#B7B9D0",
    water: "#6493EA",
    bug: "#A7B723",
    dragon: "#7037FF",
    electric: "#F9CF30",
    ghost: "#70559B",
    fire: "#F57D31",
    fairy: "#E69EAC",
    ice: "#9AD6DF",
    fighting: "#C12239",
    normal: "#AAA67F",
    grass: "#74CB48",
    psychic: "#FB5584",
    rock: "#B69E31",
    dark: "#75574C",
    ground: "#DEC16B",
    poison: "#A43E9E",
    flying: "#A891EC",
    default: "#A8A8A8",
  };

  const imagenesTipo = {
    steel:
      "https://images.wikidexcdn.net/mwuploads/wikidex/6/6c/latest/20230128124521/Tipo_acero_icono_EP.svg",
    water:
      "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20230128124702/Tipo_agua_icono_EP.svg",
    bug: "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20230128124809/Tipo_bicho_icono_EP.svg",
    dragon:
      "https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20230128124905/Tipo_drag%C3%B3n_icono_EP.svg",
    electric:
      "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20230128125008/Tipo_el%C3%A9ctrico_icono_EP.svg",
    ghost:
      "https://images.wikidexcdn.net/mwuploads/wikidex/3/3d/latest/20230128125103/Tipo_fantasma_icono_EP.svg",
    fire: "https://images.wikidexcdn.net/mwuploads/wikidex/5/55/latest/20230128125153/Tipo_fuego_icono_EP.svg",
    fairy:
      "https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20230128125233/Tipo_hada_icono_EP.svg",
    ice: "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20230128125423/Tipo_hielo_icono_EP.svg",
    fighting:
      "https://images.wikidexcdn.net/mwuploads/wikidex/f/f2/latest/20230128125518/Tipo_lucha_icono_EP.svg",
    normal:
      "https://images.wikidexcdn.net/mwuploads/wikidex/c/c3/latest/20230128125621/Tipo_normal_icono_EP.svg",
    grass:
      "https://images.wikidexcdn.net/mwuploads/wikidex/e/ed/latest/20230128125654/Tipo_planta_icono_EP.svg",
    psychic:
      "https://images.wikidexcdn.net/mwuploads/wikidex/2/22/latest/20230128125735/Tipo_ps%C3%ADquico_icono_EP.svg",
    rock: "https://images.wikidexcdn.net/mwuploads/wikidex/1/14/latest/20230128125805/Tipo_roca_icono_EP.svg",
    dark: "https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20230128132504/Tipo_siniestro_icono_EP.svg",
    ground:
      "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20230128132625/Tipo_tierra_icono_EP.svg",
    poison:
      "https://images.wikidexcdn.net/mwuploads/wikidex/f/fa/latest/20230128132735/Tipo_veneno_icono_EP.svg",
    flying:
      "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20230128132815/Tipo_volador_icono_EP.svg",
    default:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
  };

  const fondosTipo = {
  steel: new URL('./assets/fondos/steel.png', import.meta.url).href,
  water: new URL('./assets/fondos/water.png', import.meta.url).href,
  bug: new URL('./assets/fondos/bug.png', import.meta.url).href,
  dragon: new URL('./assets/fondos/dragon.png', import.meta.url).href,
  electric: new URL('./assets/fondos/electric.png', import.meta.url).href,
  ghost: new URL('./assets/fondos/ghost.png', import.meta.url).href,
  fire: new URL('./assets/fondos/fire.png', import.meta.url).href,
  fairy: new URL('./assets/fondos/fairy.png', import.meta.url).href,
  ice: new URL('./assets/fondos/ice.png', import.meta.url).href,
  fighting: new URL('./assets/fondos/fighting.png', import.meta.url).href,
  default: new URL('./assets/fondos/normal.png', import.meta.url).href,
  grass: new URL('./assets/fondos/grass.png', import.meta.url).href,
  psychic: new URL('./assets/fondos/psychic.png', import.meta.url).href,
  rock: new URL('./assets/fondos/rock.png', import.meta.url).href,
  dark: new URL('./assets/fondos/dark.png', import.meta.url).href,
  ground: new URL('./assets/fondos/ground.png', import.meta.url).href,
  poison: new URL('./assets/fondos/poison.png', import.meta.url).href,
  flying: new URL('./assets/fondos/flying.png', import.meta.url).href,
  default: new URL('./assets/fondos/default.png', import.meta.url).href,
};

  const tipo = type.toLowerCase();

  return {
    imagen: imagenesTipo[tipo] || imagenesTipo.default,
    color: coloresTipo[tipo] || coloresTipo.default,
    fondo: fondosTipo[tipo] || fondosTipo.default
  };
}

function generarColorFondo(types) {
  const colores = types.map((t) => obtenerTipo(t.type.name).color);

  if (colores.length === 1) {
    return colores[0];
  }

  const porcentajePaso = 100 / (colores.length - 1);
  const gradiente = colores
    .map((color, i) => `${color} ${i * porcentajePaso}%`)
    .join(", ");

  return `linear-gradient(135deg, ${gradiente})`;
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0px;
  padding: 0px;
}

body {
  display: block;
  place-items: normal;
  background-color: #d4d4d8;
  margin: 0;
  padding: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #2d2d2d;
  color: white;
  width: 99vw;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

p {
  text-transform: capitalize;
}

h2 {
  margin: 0;
  font-size: 24px;
  font-weight: normal;
}

.nombrePag {
  display: flex;
  align-items: center;
  gap: 15px;
}

.busqueda {
  display: flex;
  align-items: center;
  gap: 35px;
  font-size: 16px;
}

.input-img {
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 10px;
  padding-left: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 15px;
}

.input-img img{
  width: 25px;
}

input {
  border-radius: 5px;
  border: none;
  height: 30px;
  width: 200px;
  font-size: 14px;
}

section {
  background-color: #d4d4d8;
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.infoPokemon {
  display: grid;
  grid-template-columns: 1fr 1fr 1px 1fr;
  width: 90%;
  background-color: #3a3a3a;
  overflow: hidden;
}

.habitad {
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.imagen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2d2d2d;
  padding: 40px 20px;
}

.imagen img {
  width: 320px;
  height: 320px;
}

.imagen h2 {
  color: white;
  font-family: Arial, sans-serif;
  font-size: 60px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 20px;
}

.datos {
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 18px;
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tipos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 30vw;
}

.tipos p {
  margin: 0;
  font-size: 18px;
}

.tipo {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
}

.tipo img {
  width: 32px;
  height: 32px;
  border-radius: 30%;
  object-fit: cover;
}

.info p {
  font-size: 18px;
  margin: 3px;
}

hr {
  border: none;
  border-top: 1px solid #5a5a5a;
  margin: 0px 10px;
  height: 1px;
}

.separador {
  border-left: 1px solid #5a5a5a;
  margin: 20px 0;
  width: 1px;
}

.habilidades {
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  color: white;
}

.stat {
  display: grid;
  gap: 3px;
  width: 25vw;
  text-transform: capitalize;
}

.barra-animada {
  flex: 1;
  height: 12px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.relleno-animado {
  height: 100%;
  background-size: 300% 300%;
  animation: moverGradiente 2s linear infinite;
  border-radius: 10px;
}

@keyframes moverGradiente {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>