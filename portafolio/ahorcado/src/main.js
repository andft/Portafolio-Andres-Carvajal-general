import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import { router } from "./routes/routes.js"

import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)

app.use(Quasar, {
  plugins: {
    Notify
  }
})

app.mount('#app')