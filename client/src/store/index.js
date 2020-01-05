import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import kanji from './modules/kanji';
import stories from './modules/stories';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    user,
    kanji,
    stories
  }
})