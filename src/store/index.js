import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'
import test from './test'

export default createStore({
  plugins: [
    persistedState({ storage: window.sessionStorage })
  ],
  state: {
    title: '333'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    test
  }
})
