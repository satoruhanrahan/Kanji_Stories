import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import KanjiList from '../views/KanjiList.vue'
import Kanji from '../views/Kanji.vue'
import PublicStories from '../views/PublicStories.vue'
import EditStory from '../views/EditStory.vue'

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
    path: '/kanji',
    name: 'Kanji',
    component: Kanji,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/publicStories',
    name: 'Public Stories',
    component: PublicStories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editStory',
    name: 'Edit Story',
    component: EditStory,
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
