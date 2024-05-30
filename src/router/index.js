import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Shop from '../views/Shop.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import News from '../views/News.vue'
import NewsDetail from '../views/NewsDetail.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },

  {
    path: '/product-detail',
    name: 'Product Detail',
    component: ProductDetail
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },

  {
    path: '/news',
    name: 'News',
    component: News
  },

  {
    path: '/news-detail',
    name: 'News Detail',
    component: NewsDetail
  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router