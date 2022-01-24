import { createStore } from 'vuex'

export default createStore({
    state() {
      return {
        cities: [],
        searchSuggestions: [],
        errors: [],
        searchResults: [],
        searchPhrase: "",
        filterSearchBy: {
          cityIds: [],
          online: false,
          offline: false,
        },
        orderSearchBy: {
          name: false,
          score: true,
          scoreCount: false
        }
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
      },

      // this solution is temporary as it will need re-implemented with pagination
      searchResults(state) {
        return state.searchResults
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
              filterBy: state.filterSearchBy,
              orderBy: state.orderSearchBy
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
        state.filterSearchBy.cityIds = payload
      },

      orderSearchByName(state) {
        state.orderSearchBy.name = true
        state.orderSearchBy.score = false
        state.orderSearchBy.scoreCount = false
      },

      orderSearchByScore(state) {
        state.orderSearchBy.name = false
        state.orderSearchBy.score = true
        state.orderSearchBy.scoreCount = false
      },

      orderSearchByScoreCount(state) {
        state.orderSearchBy.name = false
        state.orderSearchBy.score = false
        state.orderSearchBy.scoreCount = true
      },

      switchShowOnlyOfflineClasses(state) {
        state.filterSearchBy.offline = !state.filterSearchBy.offline
        
        if (state.filterSearchBy.offline) {
          state.filterSearchBy.online = false
        }
      },

      switchShowOnlyOnlineClasses(state) {
        state.filterSearchBy.online = !state.filterSearchBy.online
                
        if (state.filterSearchBy.online) {
          state.filterSearchBy.offline = false
        }
      }
    }
  })