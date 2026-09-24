import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import MahasiswaPage from './pages/MahasiswaPage.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/mahasiswa', name: 'mahasiswa', component: MahasiswaPage },
  ],
})

createApp(App).use(router).mount('#app')
