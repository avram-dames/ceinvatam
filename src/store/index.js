import { createStore, storeKey } from 'vuex';
import VuexPersistence from 'vuex-persist'
import supabase from '../utils/supabase';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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

function flattenRecord(rec) {
  rec['partner'] = rec['partners']['name']
  rec['city_ids'] = rec['class2cities'].forEach((item) => item.city_id)
  delete rec.partners
  delete rec.class2cities
  return rec
}

export default createStore({
  state() {
    return {
      user: null,
      redirect: null,
      cities: [],
      searchSuggestions: [],
      searchByTopic: false,
      categories: [],
      topics: [],
      errors: [],
      alerts: [],
      searchResults: [],
      loadingResults: false,
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

    userIsAuthenticated(state) {
      return state.user?.role === 'authenticated'
    },

    userIsReviewer(state) {
      return state.user?.user_metadata.is_reviewer
    },

    userInputIsEmpty(state) {
      return state.searchPhrase === '' && state.filterSearchBy.cityIds.length === 0
    },

    searchResults(state) {
      return state.searchResults
    },
    userEmail(state) {
      return state.user?.email
    },
    userFirstName(state) {
      const defaultValue = state.user?.user_metadata?.user_first_name;
      const fullNameArray = state.user?.user_metadata?.full_name?.split(" ");
      return defaultValue || fullNameArray?.slice(0, fullNameArray.length - 1).join(' ');
    },
    userLastName(state) {
      const defaultValue = state.user?.user_metadata?.user_last_name;
      const fullNameArray = state.user?.user_metadata?.full_name?.split(" ") || [];
      return defaultValue || fullNameArray[fullNameArray.length - 1];
    },
    userFullName(state) {
      const defaultValue = state.user?.user_metadata?.user_full_name;
      const socialFullName = state.user?.user_metadata?.full_name || state.user?.user_metadata?.name
      return defaultValue || socialFullName
    },
    userAvatar(state) {
      const defaultAvatarUrl = 'https://res.cloudinary.com/avram-dev/image/upload/v1644927764/test/default_avatar_pnkzp3.svg';
      const userAvatar = state.user?.user_metadata?.user_avatar;
      const socialAvatar = state.user?.user_metadata?.avatar_url || state.user?.user_metadata?.picture
      return userAvatar || socialAvatar || defaultAvatarUrl
    },
    userLinkedAccounts(state) {
      if (state.user?.role === 'authenticated') {
        const providers = state.user.identities.map(
          (item) => item.provider
        )
        return providers
      }
    },
    popAlert(state) {
      return state.alerts.pop()
    },
    loadingResults(state) {
      return state.loadingResults
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

    async fetchCategories({ commit }) {
      let { data: classes, error } = await supabase
        .from('categories_by_classes')
        .select('name:category, count:available_classes')
      if (error) throw error

      commit('setCategories', classes)
    },

    async fetchTopics({ commit }) {
      let { data: classes, error } = await supabase
        .from('topics_by_classes')
        .select('category, name:topic, count:available_classes')
      if (error) throw error

      commit('setTopics', classes)
    },

    async fetchCities({ commit }) {
      let { data: cities, error } = await supabase
        .from('cities')
        .select('*')

      if (error) throw error

      commit('setCities', cities)
    },

    async fetchSearchResults({ state, commit, getters }) {
      commit('startLoadingResults');
      let query;

      if (state.searchByTopic) {
        query = supabase.from('classes')
          .select("id, name, score, score_count, offline, online, duration, partners(name), class2cities(city_id)")
          .eq('topic', state.searchByTopic)
      }
      else if (state.searchPhrase === '') {
        query = supabase.rpc('query_classes_by_cityids', {
          cityid_filter: prepareCityFilter(state.filterSearchBy.cityIds)
        })
      }
      else {
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

      if (state.searchByTopic) { classes.forEach(flattenRecord) }

      commit('setSearchResults', classes);
      commit('doneLoadingResults')
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
    switchOnSearchByTopic(state, payload) {
      state.searchByTopic = payload
    },
    switchOffSearchByTopic(state) {
      state.searchByTopic = ''
    },
    setCategories(state, payload) {
      state.categories = payload
    },

    setTopics(state, payload) {
      state.topics = payload
    },

    updateSearchPhrase(state, payload) {
      state.searchPhrase = payload
    },

    setSearchSuggestions(state, payload) {
      state.searchSuggestions = payload
    },

    setSearchResults(state, payload) {
      state.searchResults = payload
    },

    clearSearchPhrase(state) {
      state.searchPhrase = ""
    },

    clearFilterSearchByCityIds(state) {
      state.filterSearchBy.cityIds =  []
    },

    clearSearchResults(state) {
      state.searchResults = []
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
    },

    storeUser(state, payload) {
      state.user = payload
    },

    setRedirect(state, payload) {
      state.redirect = payload
    },

    deleteRedirect(state) {
      state.redirect = null
    },

    pushAlert(state, payload) {
      state.alerts.push(payload)
    },

    deleteAlerts(state) {
      state.alerts = []
    },

    startLoadingResults(state) {
      state.loadingResults = true
    },

    doneLoadingResults(state) {
      state.loadingResults = false
    }
  },
  plugins: [vuexLocal.plugin]
})