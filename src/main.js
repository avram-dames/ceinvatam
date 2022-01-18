import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router/'

import './index.css'

const store = createStore({
  state() {
    return {
      searchPhrase: "",
      cityFilterIds: [],
      searchSuggestions: [],
      searchResults: [],
      cities: [],
      errors: []
    }
  },
  getters: {
    cityOptions(state) {
      return state.cities.reduce(
        (obj, item) => (obj[item.id] = item.name, obj)
        , {});
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
    },
    async fetchCities({ commit }) {
      const apiUrl = "/api/cities";
      const response = await fetch(apiUrl);
      
      if (response.status !== 200) {
        commit('addErrorMessage', 'Unable to load cities.');
      }
      const data = await response.json();

      commit('setCities', data.cities)
    }
  },
  mutations: {
    updateSearchPhrase(state, payload) {
      state.searchPhrase = payload
    },

    setSearchSuggestions(state, payload) {
      state.searchSuggestions = payload
    },

    addErrorMessage(state, payload) {
      state.errors.push(payload)
    },

    popErrorMessage(state) {
      state.errors.pop()
    },

    setCities(state, payload) {
      state.cities = payload
    },

    setCityFilterId(state, payload) {
      state.cityFilterIds = payload
    }
  }
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')