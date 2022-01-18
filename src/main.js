import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router/'

import './index.css'

const store = createStore({
  state() {
    return {
      searchSuggestions: [],
      searchResults: [],
      cities: [],
      errors: []
    }
  },
  actions: {
    async fetchSearchSuggestions({ commit }) {
      const apiUrl = "/api/searchsuggestions";
      const response = await fetch(apiUrl);
      
      if (response.status !== 200) {
        commit('addErrorMessage', 'Unable to load search suggestions.');
      }
      const data = await response.json();

      commit('setSearchSuggestions', data.suggestions)
    }
  },
  mutations: {
    setSearchSuggestions(state, payload) {
      state.searchSuggestions = payload
    },

    addErrorMessage(state, payload) {
      state.errors.push(payload)
    },

    popErrorMessage(state) {
      state.errors.pop()
    }
  }
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')