import { createApp } from 'vue';
import App from './App.vue';

// Pinia stores
import { createPinia } from 'pinia';
import { useCreateSwitchStore, useDeadmanSwitchStore, useLoginSignupStore } from './javascript/stateManager';

import { createVuestic } from 'vuestic-ui';
import 'vuestic-ui/css';

const pinia = createPinia();

createApp(App)
    .use(createVuestic())
    .use(pinia)
    .mount('#app')

// Init Pinia stores
const createSwitchStore = useCreateSwitchStore()
const deadmanSwitchStore = useDeadmanSwitchStore();
const loginSignupStore = useLoginSignupStore();
export { createSwitchStore, deadmanSwitchStore, loginSignupStore };
