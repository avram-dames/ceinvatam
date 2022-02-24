<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
import SearchBoxTextInput from "./SearchBoxTextInput.vue";
import { useStore } from "vuex";

const store = useStore(); 
const router = useRouter();
const userInputIsEmpty = computed(() => store.getters.userInputIsEmpty)

store.commit('clearSearchPhrase');
store.commit('clearFilterSearchByCityIds');
store.commit('clearSearchResults');

function fetchResultsAndGo2ResultsPage() {
  if (userInputIsEmpty.value) {
    alert('Please provide a search phrase or a city filter.')
    return
  }
  store.commit('switchOffSearchByTopic');
  store.dispatch('fetchSearchResults')
  router.push({name: "Results"})
}
</script>

<template>
  <form
    @submit.prevent
    class="flex flex-col space-y-4 lg:flex-row lg:space-x-2 lg:space-y-0"
  >
    <div class="lg:w-1/3">
      <SearchBoxTextInput></SearchBoxTextInput>
    </div>
    <div class="lg:w-1/3">
      <SearchBoxMultiSelect></SearchBoxMultiSelect>
    </div>
    <button
      @click="fetchResultsAndGo2ResultsPage"
      class="text-white bg-purple-400 hover:bg-purple-300 rounded-md lg:w-48 h-12"
    >
      Caută
    </button>
  </form>
</template>