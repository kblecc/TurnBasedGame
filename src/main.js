

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents from "vue3-touch-events";
import FloatingVue from 'floating-vue'

const app = createApp(App)

app.use(router).use(Vue3TouchEvents).use(FloatingVue)


app.mount('#app')
