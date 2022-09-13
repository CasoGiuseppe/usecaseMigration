import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app/views/App.vue';
import router from './app/router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
