import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const pinia = createPinia()

createApp(App)
    .use(createVuestic())
    .use(pinia)
    .mount('#app')
