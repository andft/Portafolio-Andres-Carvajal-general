import Inicio from "../views/Inicio.vue"
import Nombre from "../views/Nombre.vue"
import Categoria from "../views/Categoria.vue"
import Nivel from "../views/Nivel.vue"
import Juego from "../views/Juego.vue"
import Record from "../views/Record.vue"

import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: Inicio },
  { path: "/nombre", component: Nombre },
  { path: "/categoria", component: Categoria },
  { path: "/nivel", component: Nivel },
  { path: "/juego", component: Juego },
  { path: "/record", component: Record },

  { path: "/:catchAll(.*)", redirect: "/" }
]

// Variable en memoria que se reinicia al recargar la página
let initialNavigation = true

// Primero se crea:
export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Luego sí puedes usar beforeEach
router.beforeEach((to, from, next) => {
  if (initialNavigation) {
    initialNavigation = false // solo la primera vez por carga
    if (to.path !== "/") {
      return next("/") // redirige a inicio si recargas en otra ruta
    }
  }
  next()
})
