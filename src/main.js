import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'  
import mitt from 'mitt'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const emitter = mitt();

import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

//For gloabl use
app.provide('emitter', emitter);

app.use(router).use(VueAwesomePaginate).use(pinia).mount('#app');
