import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es-mx'
import 'material-symbols'
import './style.css'
import { router } from './router'
import App from './App.vue'
import { PosSingleton } from './services/pos-service'

const host = localStorage.getItem('x-pos-host') ?? `http://${window.location.hostname}:8080`
new PosSingleton(host)
dayjs.locale('es-mx')
dayjs.extend(relativeTime)

createApp(App)
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')
