import { createApp } from 'vue'
import App from './App.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

createApp(App)
    .use(createVuestic())
    .mount('#app')

app.component(VueCountdown.name, VueCountdown);
