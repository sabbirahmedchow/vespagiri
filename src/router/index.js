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
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import Thankyou from '../views/Thankyou.vue'
import Search from '../views/Search.vue'

const ifAuthenticated = (to, from, next) => {
  //const { $cookies } = router.app.config.globalProperties;
  if (document.cookie.indexOf('user_fullname') > -1) {
    next();
    return;
  }
  else
  {
  router.push({ 
    name: 'Login',
    
  });
}
 };

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
    path: '/product-detail/:name',
    name: 'Product Detail',
    component: ProductDetail,
    props: true
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
    path: '/news-detail/:title',
    name: 'News Detail',
    component: NewsDetail,
    props: true
  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },

  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: true
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/thankyou',
    name: 'Thankyou',
    component: Thankyou
  },

  {
    path: '/my-account',
    name: 'Account',
    component: Account,
    beforeEnter: ifAuthenticated,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router