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
        <input
          v-model="nombre"
          type="text"
          placeholder="Busca tu pokemon"
          id="pokemon"
        />
        <button @click="buscarPokemon" class="input-img">
          <img
            :src="'https://cdn-icons-png.flaticon.com/512/622/622669.png'"
            :alt="imgLupa"
          />
        </button>
      </div>
    </nav>

    <section>
      <div
        class="infoPokemon"
        v-if="pokemonData && pokemonData.types && pokemonData.types.length"
        :style="{
          border: '6px solid transparent',
          borderImageSource: generarColorFondo(pokemonData.types),
          borderImageSlice: 1,
        }"
      >
        <div class="imagen">
          <div
            class="habitad"
            :style="{
              'background-image': `url(${
                obtenerTipo(pokemonData.types[0].type.name).fondo
              })`,
            }"
          >
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
                  width: (stat.base_stat / 255) * 100 + '%',
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
    steel: new URL("./assets/fondos/steel.png", import.meta.url).href,
    water: new URL("./assets/fondos/water.png", import.meta.url).href,
    bug: new URL("./assets/fondos/bug.png", import.meta.url).href,
    dragon: new URL("./assets/fondos/dragon.png", import.meta.url).href,
    electric: new URL("./assets/fondos/electric.png", import.meta.url).href,
    ghost: new URL("./assets/fondos/ghost.png", import.meta.url).href,
    fire: new URL("./assets/fondos/fire.png", import.meta.url).href,
    fairy: new URL("./assets/fondos/fairy.png", import.meta.url).href,
    ice: new URL("./assets/fondos/ice.png", import.meta.url).href,
    fighting: new URL("./assets/fondos/fighting.png", import.meta.url).href,
    default: new URL("./assets/fondos/normal.png", import.meta.url).href,
    grass: new URL("./assets/fondos/grass.png", import.meta.url).href,
    psychic: new URL("./assets/fondos/psychic.png", import.meta.url).href,
    rock: new URL("./assets/fondos/rock.png", import.meta.url).href,
    dark: new URL("./assets/fondos/dark.png", import.meta.url).href,
    ground: new URL("./assets/fondos/ground.png", import.meta.url).href,
    poison: new URL("./assets/fondos/poison.png", import.meta.url).href,
    flying: new URL("./assets/fondos/flying.png", import.meta.url).href,
    default: new URL("./assets/fondos/default.png", import.meta.url).href,
  };

  const tipo = type.toLowerCase();

  return {
    imagen: imagenesTipo[tipo] || imagenesTipo.default,
    color: coloresTipo[tipo] || coloresTipo.default,
    fondo: fondosTipo[tipo] || fondosTipo.default,
  };
}

function generarColorFondo(types) {
  const colores = types.map((t) => obtenerTipo(t.type.name).color);

  if (colores.length === 1) {
    return `linear-gradient(135deg, ${colores[0]}, ${colores[0]})`;
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
  width: 100vw;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

p {
  text-transform: capitalize;
}

h2 {
  margin: 0;
  font-size: 20px;
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
  gap: 10px;
  font-size: 16px;
}

button {
  border-radius: 5px;
  border: none;
  height: 34px;
  width: 35px;
  font-size: 14px;
  padding: 2px 10px;
}

.input-img {
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 10px;
  border-radius: 5px;
}

.input-img img {
  width: 15px;
}

input {
  border-radius: 5px;
  border: none;
  height: 30px;
  width: 200px;
  font-size: 14px;
  padding: 2px 10px;
}

section {
  background-color: #d4d4d8;
  width: 100vw;
  height: 90vh;
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
  font-size: 50px;
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
  width: 20vw;
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

@media (max-width: 1024px) {
  .infoPokemon {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    width: 90%;
    text-align: center;
    border-radius: 16px;
    gap: 25px;
    padding-bottom: 20px;
  }

  .imagen {
    padding: 35px 20px;
    gap: 20px;
  }

  .imagen img {
    width: 260px;
    height: 260px;
  }

  .imagen h2 {
    font-size: 42px;
    margin-top: 10px;
  }

  .datos {
    margin: 15px auto;
    width: 90%;
  }

  .habilidades {
    display: flex;
    flex-wrap: wrap;
    margin: 15px auto;
    width: 90%;
  }

  .habilidades h3 {
    flex-basis: 100%;
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }

  .stat {
    margin: 15px auto;
    gap: 15px;
    width: 30%;
  }

  .tipos {
    margin: 15px auto;
    gap: 15px;
    width: 90%;
  }

  .tipo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 12px;
  }

  .tipo img {
    width: 36px;
    height: 36px;
  }

  .separador {
    display: none;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  section {
    height: auto;
    padding: 40px 0;
    width: 100%;
  }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
  }

  .busqueda {
    width: 100%;
    justify-content: center;
  }

  input {
    width: 90%;
  }

  .infoPokemon {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    width: 90%;
    text-align: center;
    border-radius: 14px;
    gap: 20px;
    padding-bottom: 20px;
  }

  .imagen {
    padding: 30px 10px;
    gap: 15px;
  }

  .imagen img {
    width: 200px;
    height: 200px;
  }

  .imagen h2 {
    font-size: 32px;
    margin-top: 8px;
  }

  .datos {
    margin: 10px auto;
    width: 95%;
    gap: 5px;
  }

  .habilidades {
    display: flex;
    flex-wrap: wrap;
    margin: 15px auto;
    width: 90%;
  }

  .habilidades h3 {
    flex-basis: 100%;
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }

  .stat {
    margin: 10px auto;
    width: 30%;
    gap: 10px;
  }

  .tipos {
    margin: 10px auto;
    width: 100%;
    gap: 10px;
  }

  .tipo {
    padding: 6px 10px;
    gap: 8px;
  }

  .tipo img {
    width: 30px;
    height: 30px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .separador {
    display: none;
  }

  section {
    height: auto;
    padding: 30px 0;
    width: 100%;
  }
}

@media (max-width: 480px) {
  nav {
    flex-direction: column;
    gap: 12px;
    padding: 12px 15px;
  }

  .nombrePag h2 {
    font-size: 18px;
  }

  input {
    width: 80%;
    font-size: 13px;
  }

  button {
    width: 30px;
    height: 30px;
  }

  .infoPokemon {
    width: 90%;
    gap: 15px;
    border-radius: 12px;
    padding: 15px 0 25px 0;
  }

  .imagen {
    padding: 20px 10px;
    gap: 10px;
  }

  .imagen img {
    width: 150px;
    height: 150px;
  }

  .imagen h2 {
    font-size: 24px;
  }

  .datos {
    font-size: 14px;
    width: 90%;
  }

  .habilidades {
    display: flex;
    flex-wrap: wrap;
    margin: 15px auto;
    width: 90%;
  }

  .habilidades h3 {
    flex-basis: 100%;
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  .stat {
    width: 60%;
    margin: 8px 0;
    gap: 10px;
  }

  .tipos {
    width: 95%;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tipo {
    padding: 4px 8px;
    gap: 6px;
  }

  .tipo img {
    width: 24px;
    height: 24px;
  }

  .tipos p,
  .info p {
    font-size: 13px;
  }

  h3 {
    font-size: 16px;
  }

  section {
    padding: 20px 0;
  }
}
</style>