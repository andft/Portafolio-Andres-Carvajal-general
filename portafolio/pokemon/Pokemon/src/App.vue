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
          <input v-model="nombre" type="text" placeholder="Busca tu pokemon" class="input-img" id="pokemon"/>
          <button @click="buscarPokemon">Buscar</button>
        </div>
      </div>
    </nav>

    <section>
      <div class="infoPokemon" v-if="pokemonData">
        <div class="imagen">
          <img :src="pokemonData.sprites.other['official-artwork'].front_default" alt="pokemon" />
          <h2>{{pokemonData.name}}</h2>
        </div>
        <div class="datos">
          <div class="">
            <h3>Tipo:</h3>
          <div class="tipos" v-for="(tipo, i) in pokemonData.types" :key="i">
            <div class="tipo">
              <img :src="obtenerTipo(tipo.type.name)" :alt="tipo.type.name" />
              <p>{{tipo.type.name}}</p>
            </div>
          </div>
          <hr>
          <div class="debilidades">
            <h3>Debilidades:</h3>
            <div class="tipos">
              <div class="tipo"  v-for="(debilidad, i) in debilidades" :key="i">
                <img :src="obtenerTipo(debilidad.name)" alt="debilidad" />
                <p>{{debilidad.name}}</p>
              </div>
            </div>
          </div>
          <hr>
          <div class="info">
            <h3>Datos Fisicos:</h3>
            <p>Altura: {{pokemonData.height/10}} m</p>
            <p>Peso: {{pokemonData.weight/10}} kg</p>
          </div>
          </div>
        </div>
        <div class="habilidades">
          <h3>Habilidades:</h3>
          <div v-for="(stat, i) in pokemonData.stats" :key="i" class="barra">
            <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
            <div class="barra-fondo">
              <div class="barra-progreso" :style="{ width: stat.base_stat + '%' }"></div>
            </div>
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
    const resPokemon = await axios.get(
      `${url}${nombre.value.toLowerCase()}`
    );
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
  switch (type.toLowerCase()) {
    case "steel":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/6/6c/latest/20230128124521/Tipo_acero_icono_EP.svg";
    case "water":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20230128124702/Tipo_agua_icono_EP.svg";
    case "bug":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/1/1a/latest/20230128124809/Tipo_bicho_icono_EP.svg";
    case "dragon":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20230128124905/Tipo_drag%C3%B3n_icono_EP.svg";
    case "electric":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20230128125008/Tipo_el%C3%A9ctrico_icono_EP.svg";
    case "ghost":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/3/3d/latest/20230128125103/Tipo_fantasma_icono_EP.svg";
    case "fire":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/5/55/latest/20230128125153/Tipo_fuego_icono_EP.svg";
    case "fairy":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20230128125233/Tipo_hada_icono_EP.svg";
    case "ice":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20230128125423/Tipo_hielo_icono_EP.svg";
    case "fighting":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/f/f2/latest/20230128125518/Tipo_lucha_icono_EP.svg";
    case "normal":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/c/c3/latest/20230128125621/Tipo_normal_icono_EP.svg";
    case "grass":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/e/ed/latest/20230128125654/Tipo_planta_icono_EP.svg";
    case "psychic":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/2/22/latest/20230128125735/Tipo_ps%C3%ADquico_icono_EP.svg";
    case "rock":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/1/14/latest/20230128125805/Tipo_roca_icono_EP.svg";
    case "dark":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20230128132504/Tipo_siniestro_icono_EP.svg";
    case "ground":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20230128132625/Tipo_tierra_icono_EP.svg";
    case "poison":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/f/fa/latest/20230128132735/Tipo_veneno_icono_EP.svg";
    case "flying":
      return "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20230128132815/Tipo_volador_icono_EP.svg";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"; // default icon
  }
}
</script>

<style>
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

.busqueda > div:first-child {
  border-bottom: 2px solid white;
  padding-bottom: 5px;
}

.input-img {
  background-image: url("https://cdn-icons-png.flaticon.com/512/622/622669.png");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 18px;
  padding-left: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 15px;
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
  grid-template-columns: 1fr 1fr 1fr;
  border: 8px solid #7dd3fc;
  border-radius: 15px;
  background-color: #3a3a3a;
  width: 1200px;
  max-width: 90%;
  overflow: hidden;
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
  height: 320px;/* 
  object-fit: contain; */
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
  text-align: start;
  font-size: 18px;
  background-color: #3a3a3a;
}

h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tipos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 5px;
}

.tipos p {
  margin: 0;
  font-size: 18px;
}

.debilidades {
  margin-top: 20px;
}

.info {
  margin-top: 20px;
}

.info p {
  margin: 8px 0;
  font-size: 18px;
}

hr {
  border: none;
  border-top: 1px solid #5a5a5a;
  margin: 5px 0;
}

.habilidades {
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  color: white;
}

.barra {
  width: 250px;
}

.barra-fondo {
  background-color: #eee;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.barra-progreso {
  height: 10px;
  background-color: #ffcb05;
  transition: width 0.3s ease;
}

.tipos {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tipo {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f4f4f4;
  padding: 6px 10px;
  border-radius: 8px;
}

.tipo img {
  width: 32px;
  height: 32px;
}
</style>