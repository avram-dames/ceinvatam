import { reactive } from "vue";

const store = {
    debug: true,

    state: reactive({
        searchResults: [],
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
        ],
        cityOptions: {
            1: 'București',
            2: 'Timișoara',
            3: 'Cluj Napoca',
            4: 'Chișinău'
        },
        targetUsers: {
            0: "",
            1: "Copii",
            2: "Adulți",
            3: "Toate Vârstele",
        },
        durationUnits: {
            0: "",
            1: "ore",
            2: "luni",
            3: "ani",
            4: "perioană nedeterminată",
        }
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
    },

    getCityIds() {
        Object.keys(this.state.cityOptions)
    },

    getCityOptions() {
        return this.state.cityOptions
    }
}

export default store