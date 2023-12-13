import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebaseService from './services/firebaseService';

const app = createApp(App);

app.config.globalProperties.$firebaseService = firebaseService;

app.use(router).mount('#app');
