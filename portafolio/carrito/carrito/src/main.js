import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import './style.css'
import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {
      position: "top",  
      timeout: 2000, 
      textColor: "white", 
      actions: [] 
    }
  }
});

myApp.mount("#app");
