import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faPenAlt, faShareAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add({ faSearch, faPenAlt, faShareAlt, faEdit })
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires a visitor not logged in, check if logged in
    // if logged in, redirect to kanji list page.
    if (store.getters.loggedIn) {
      next({
        path: '/kanjiList'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
