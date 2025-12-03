import Inicio from "../views/Inicio.vue"
import Nombre from "../views/Nombre.vue"
import Categoria from "../views/Categoria.vue"
import Nivel from "../views/Nivel.vue"
import Juego from "../views/Juego.vue"
import Record from "../views/Record.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {path:"/", component:Inicio},
    {path:"/nombre", component:Nombre},
    {path:"/categoria", component:Categoria},
    {path:"/nivel", component:Nivel},
    {path:"/juego", component:Juego},
    {path:"/record", component:Record},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
