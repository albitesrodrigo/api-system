import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import EditProductView from '@/views/EditProductView.vue'
import CreateProductView from '@/views/CreateProductView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Inicio',
    component: HomeView
  },
  {
    path: '/edit-product/:id',
    name: 'Editar Producto',
    component: EditProductView
  },
  {
    path: '/create-product',
    name: 'Crear Producto',
    component: CreateProductView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
