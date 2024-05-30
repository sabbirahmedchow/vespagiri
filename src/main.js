import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  
import mitt from 'mitt'

const emitter = mitt();

import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);

//For gloabl use
app.provide('emitter', emitter);

app.use(router).use(VueAwesomePaginate).mount('#app');
