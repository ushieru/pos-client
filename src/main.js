import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './style.css'
import 'material-symbols';
import { router } from './router'
import App from './App.vue'
import { PosSingleton } from './services/pos-service'

const host = localStorage.getItem('x-pos-host') ?? `http://${window.location.hostname}:8080`
new PosSingleton(host)

createApp(App)
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')
