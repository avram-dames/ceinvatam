import { createStore } from 'vuex'

export default createStore({
    state() {
      return {
        searchPhrase: "",
        cityFilterIds: [],
        searchSuggestions: [],
        searchResults: [],
        cities: [],
        errors: [],
      }
    },
    getters: {
      cityOptions(state) {
        return state.cities.reduce(
          (obj, item) => (obj[item.id] = item.name, obj)
          , {});
      },
      
      userInputIsEmpty(state) {
        return state.searchText === '' && state.setCityFilterId.length === 0
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
      },
  
      async fetchSearchResults({ state, commit, getters }) {
        if (getters.userInputIsEmpty) {
          commit('addErrorMessage', 'Please select a city or a search phrase.')
          return;
        }
  
        const apiUrl = "/api/query";
        const apiRequestOptions = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              searchText: state.searchPhrase,
              cityFilterIds: state.cityFilterIds,
            },
          }),
        };
  
        let response = await fetch(apiUrl, apiRequestOptions);
  
        if (response.status !== 200) {
          commit('addErrorMessage', 'Something went wrong. Please try again.');
          return;
        }
  
        const data = await response.json();
        commit('setSearchResults', data.data);
      }
  
    },
    mutations: {
      updateSearchPhrase(state, payload) {
        state.searchPhrase = payload
      },
  
      setSearchSuggestions(state, payload) {
        state.searchSuggestions = payload
      },
  
      setSearchResults(state, payload) {
        state.searchResults = payload
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