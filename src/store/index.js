import { createStore } from 'vuex';
import supabase from '../utils/supabase';

function prepareTextSearchTerms(text) {
  console.debug(`Cleaning up user text input: ${text}`)
  if (!text) {
    return ""
  } else {
    const cleanTerms = text.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s!?]/g, '')
      .split(/[ ,]+/)
    return cleanTerms.map(term => `${term}:*`).join(" & ")
  }
}

function prepareCityFilter(citiesList) {
  console.debug(`Cleaning up city list: ${citiesList}`)
  if (citiesList.length === 0) {
    return null
  }
  return citiesList.map(city => Number(city))
}

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

    searchResults(state) {
      return state.searchResults
    }
  },
  actions: {
    async fetchSearchSuggestions({ commit }) {
      let { data: search_suggestions, error } = await supabase
        .from('search_suggestions')
        .select('id, name, target_id, target_slug, entity, rank')
        .order('rank, name')

      if (error) throw error

      commit('setSearchSuggestions', search_suggestions)
    },

    async fetchCities({ commit }) {
      let { data: cities, error } = await supabase
        .from('cities')
        .select('*')

      if (error) throw error

      commit('setCities', cities)
    },

    async fetchSearchResults({ state, commit, getters }) {
      if (getters.userInputIsEmpty) {
        commit('addErrorMessage', 'Please select a city or a search phrase.')
        return;
      }
      let query;

      if (state.searchPhrase === '') {
        query = supabase.rpc('query_classes_by_cityids', {
          cityid_filter: prepareCityFilter(state.filterSearchBy.cityIds)
        })
      } else {
        query = supabase.rpc('query_classes', {
          search_term: prepareTextSearchTerms(state.searchPhrase),
          cityid_filter: prepareCityFilter(state.filterSearchBy.cityIds)
        })
      }

      if (state.filterSearchBy.online) {
        query = query.is('online', true)
      } else if (state.filterSearchBy.offline) {
        query = query.is('offline', true)
      }

      if (state.orderSearchBy.name) { query = query.order('name') }
      if (state.orderSearchBy.score) { query = query.order('score', { ascending: false }) }
      if (state.orderSearchBy.scoreCount) { query = query.order('score_count', { ascending: false }) }

      let { data: classes, error } = await query

      if (error) throw error

      commit('setSearchResults', classes);
    },
    orderResultsByName({ dispatch, commit }) {
      commit('orderSearchByName')
      dispatch('fetchSearchResults')
    },
    orderResultsByScore({ dispatch, commit }) {
      commit('orderSearchByScore')
      dispatch('fetchSearchResults')
    },
    orderResultsByScoreCount({ dispatch, commit }) {
      commit('orderSearchByScoreCount')
      dispatch('fetchSearchResults')
    },
    showOnlyOnlineClasses({ dispatch, commit }) {
      commit('switchShowOnlyOnlineClasses')
      dispatch('fetchSearchResults')
    },
    showOnlyOfflineClasses({ dispatch, commit }) {
      commit('switchShowOnlyOfflineClasses')
      dispatch('fetchSearchResults')
    },
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