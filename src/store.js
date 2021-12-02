import { reactive } from "vue";

const store = {
    debug: true,

    state: reactive({
        searchResults: [],
        cityFilter: [],
        cities: [{
                id: 1,
                name: 'București'
            },
            {
                id: 2,
                name: 'Timișoara'
            },
            {
                id: 3,
                name: 'Cluj Napoca'
            },
            {
                id: 4,
                name: 'Chișinău'
            },
        ]
    }),

    setSearchResults(newResults) {
        if (store.debug) {
            console.log(`setSearchResults triggered with ${newResults}`);

            this.state.searchResults = newResults
        }
    },

    clearSearchResults() {
        if (store.debug) {
            console.log('clearSearchResults triggered')
        }

        this.state.searchResults = []
    },
    setCityFilter(newResults) {
        if (store.debug) {
            console.log(`setCityFilter triggered with ${newResults}`);

            this.state.cityFilter = newResults
        }
    },

    clearCityFilter() {
        if (store.debug) {
            console.log('clearCityFilter triggered')
        }

        this.state.cityFilter = []
    }
}

export default store