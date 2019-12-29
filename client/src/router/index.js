import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import KanjiList from '../views/KanjiList.vue'
import Kanji from '../views/Kanji.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Log In',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/kanjiList',
    name: 'Kanji List',
    component: KanjiList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/kanji/:id',
    name: 'Kanji',
    component: Kanji,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
