import { reactive } from "vue";

const store = {
    debug: true,

    state: reactive({
        searchResults: []
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
    }
}

export default store