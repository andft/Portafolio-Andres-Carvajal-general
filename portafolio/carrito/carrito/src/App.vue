<template>
  <div class="fullscreen bg-grey-3 q-pa-md" style="overflow-y: auto;">
    <h1
      class="text-h1 text-center tituloCarro"
      style="
        font-size: clamp(1.8rem, 4vw, 3.2rem);
        font-weight: 700;
        text-align: center;
        color: #2c3e50;
        margin: 1.5rem auto 2rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.1;
        max-width: 90%;
        word-break: keep-all;
      "
    >
      Carrito de compras
    </h1>
    <div
      class="carritoCompra flex wrap justify-center"
      style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px"
    >
      <div
        class="productos bg-white q-pa-lg rounded-borders shadow-2"
        style="width: 490px; overflow-y: auto; height: 60vh"
      >
        <div
          class="producto q-mb-md"
          v-for="(producto, i) in productos"
          :key="i"
          style="
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-bottom: 1rem;
            background: #fff;
            border-radius: 12px;
            padding: 10px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          "
        >
          <div
            class="articulo align-center justify-center"
            style="display: flex; flex-wrap: wrap; gap: 10px"
          >
            <div class="flex justify-center align-center">
              <q-img
                :src="producto.img"
                :alt="producto.nombre"
                class="articulo-img q-pa-sm q-mt-sm q-ma-xs q-rounded-lg shadow-1"
                style="
                  width: 100px;
                  height: 100px;
                  object-fit: contain;
                  border: 2px solid #e0e0e0;
                "
                spinner-color="green"
              />
            </div>
            <div class="nombre q-pt-lg">
              <h3 class="text-h6 text-left q-ma-none">{{ producto.nombre }}</h3>
              <p class="text-left q-ma-none">
                COP {{ Number(producto.precio).toLocaleString() }}
              </p>
            </div>
          </div>
          <div
            class="cantidad"
            style="display: flex; align-items: center; justify-content: center"
          >
            <q-btn
              v-if="producto.cantidad === 0"
              class="glossy"
              color="green"
              icon="shopping_cart"
              label="Comprar"
              size="sm"
              push
              @click="agregarArticulo(i)"
              style="height: 36px"
            />
            <div
              v-else
              class="cantidad flex justify-center items-center"
              style="gap: 13px"
            >
              <q-btn
                round
                color="red"
                icon="remove"
                size="sm"
                @click="disminuir(i)"
              />
              <p class="text-h6 q-mb-none q-mt-none">{{ producto.cantidad }}</p>
              <q-btn
                round
                color="green"
                icon="add"
                size="sm"
                @click="aumentar(i)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="compra bg-white q-pa-lg rounded-borders shadow-2"
        style="width: 490px"
      >
        <h2 class="text-h5 text-left q-my-xs">CARRITO COMPRAS</h2>
        <hr />
        <div class="totales q-mt-lg">
          <div class="precios flex wrap justify-between q-mb-sm text-body2">
            <p>Total de productos</p>
            <p>{{ totalProductos }} Items</p>
          </div>
          <div class="precios flex wrap justify-between q-mb-sm text-body2">
            <p>Subtotal</p>
            <p>COP {{ subtotal.toLocaleString() }}</p>
          </div>
          <div class="precios flex wrap justify-between q-mb-sm text-body2">
            <p>Impuesto (16%)</p>
            <p>COP {{ impuesto.toLocaleString() }}</p>
          </div>
        </div>
        <hr />
        <div class="valor flex wrap justify-between q-mb-md">
          <p>TOTAL A PAGAR</p>
          <p>COP {{ totalPrecio.toLocaleString() }}</p>
        </div>
        <q-btn
          color="green"
          glossy
          label="PAGAR"
          icon="payment"
          class="btnPagar q-px-lg q-py-sm"
          @click="agregarValores"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const productos = ref([
  {
    nombre: "Zhiyun Smooth",
    precio: 190000,
    img: "https://fotoaccesorios.com.co/wp-content/uploads/2025/10/zhiyun-smooth-5s-ai-pro-5.jpg",
    cantidad: 0,
  },
  {
    nombre: "Xiaomi Watch",
    precio: 180000,
    img: "https://i02.appmifile.com/902_item_co/01/10/2024/ed8cf43615274d3817e4398188054f7c.png",
    cantidad: 0,
  },
  {
    nombre: "Amazon Alexa",
    precio: 150000,
    img: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/467286/xlarge/Echo-Dot-5-Gera-o-Amazon-Com-Alexa-Smart-Speaker-Branca_1740145273.jpg",
    cantidad: 0,
  },
  {
    nombre: "Sony Headphones",
    precio: 850000,
    img: "https://m.media-amazon.com/images/I/61ULAZmt9NL.jpg",
    cantidad: 0,
  },
  {
    nombre: "Apple AirPods",
    precio: 950000,
    img: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
    cantidad: 0,
  },
  {
    nombre: "Galaxy Tab S9",
    precio: 2500000,
    img: "https://images.samsung.com/is/image/samsung/p6pim/co/2307/gallery/co-galaxy-tab-s9-wifi-x710-sm-x710nzehcoo-537318685?%24684_547_PNG%24=",
    cantidad: 0,
  },
]);

const valoresCarro = ref([]);
const yaMostrado = ref(false);

const guardadoProductos = localStorage.getItem("productos");
if (guardadoProductos) {
  productos.value = JSON.parse(guardadoProductos);
}

const guardadoValores = localStorage.getItem("valoresCarro");
if (guardadoValores) {
  valoresCarro.value = JSON.parse(guardadoValores);
}

const totalProductos = computed(() =>
  productos.value.reduce((acc, p) => acc + p.cantidad, 0)
);
const subtotal = computed(() =>
  productos.value.reduce((acc, p) => acc + p.cantidad * p.precio, 0)
);
const impuesto = computed(() => subtotal.value * 0.16);
const totalPrecio = computed(() => subtotal.value + impuesto.value);

watch(
  productos,
  (nuevo) => {
    localStorage.setItem("productos", JSON.stringify(nuevo));
  },
  { deep: true }
);

watch(
  valoresCarro,
  (nuevo) => {
    localStorage.setItem("valoresCarro", JSON.stringify(nuevo));
  },
  { deep: true }
);

watch(totalPrecio, (nuevoTotal) => {
  if (nuevoTotal > 1000000 && !yaMostrado.value) {
    yaMostrado.value = true;

    $q.notify({
      message: "¡Superaste el millón 🥳 tu envío es GRATIS!",
      caption: "🎉 Felicitaciones",
      color: "positive",
      icon: "celebration",
      position: "top",
      timeout: 2000,
    });
  } else if (nuevoTotal <= 1000000 && yaMostrado.value) {
    yaMostrado.value = false;
  }
});

function agregarArticulo(i) {
  productos.value[i].cantidad = 1;
  $q.notify({
    message: "¡Producto agregad 🛒!",
    color: "green",
    icon: "shopping_cart",
    position: "top",
    timeout: 1000,
  });
}

function aumentar(i) {
  productos.value[i].cantidad++;
  $q.notify({
    message: "¡Producto agregado 🛒!",
    color: "green",
    icon: "shopping_cart",
    position: "top",
    timeout: 1000,
  });
}

function disminuir(i) {
  if (productos.value[i].cantidad > 1) {
    productos.value[i].cantidad--;
    $q.notify({
      message: "Disminuido 🥲",
      color: "orange",
      icon: "remove",
      position: "top",
      timeout: 800,
    });
  } else if (productos.value[i].cantidad === 1) {
    productos.value[i].cantidad = 0;
    $q.notify({
      message: "Producto eliminado.",
      color: "red",
      icon: "delete",
      position: "top",
      timeout: 1000,
    });
  }
}

function agregarValores() {
  const total = productos.value.reduce((acc, p) => acc + p.cantidad, 0);
  console.log("Total calculado dentro:", total);

  if (total === 0) {
    $q.notify({
      message: "No tienes productos en el carrito 😅",
      color: "warning",
      icon: "warning",
      position: "top",
      timeout: 1500,
    });
    return;
  }

  valoresCarro.value.push({
    cantidad: total,
    subtotal: subtotal.value,
    impuesto: impuesto.value,
    total: totalPrecio.value,
  });

  $q.notify({
    message: "Compra registrada correctamente",
    caption: `Total: $${totalPrecio.value.toLocaleString()}`,
    color: "green",
    icon: "shopping_cart",
    position: "top",
    timeout: 2000,
  });

  productos.value.forEach((p) => (p.cantidad = 0));
}
</script>

