<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Navbar from "../components/Navbar.vue";
import CardClassInfo from "../components/CardClassInfo.vue";
import CardPartnerInfo from "../components/CardPartnerInfo.vue";
import ResultsSortersAndFilters from "../components/ResultsSortersAndFilters.vue";
import ResultsNotFound from "../components/ResultsNotFound.vue";
import HomeVue from "./Home.vue";

const store = useStore();
const loadingResults = computed(() => store.getters.loadingResults);
const results = computed(() => store.getters.searchResults);
const resultsType = computed(() => store.getters.searchResultsType);
const cardComponent = resultsType.value === 'class' ? CardClassInfo : CardPartnerInfo
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4">
    <ResultsSortersAndFilters></ResultsSortersAndFilters>

    <div v-if="loadingResults" class="">
      <p>Loading ...</p>
    </div>

    <div v-else>
      <div class="mt-6 text-gray-400 text-right">
        <span>{{ results.length }}</span>
        <span v-if="resultsType.value === 'class'"> cursuri</span> 
        <span v-else> companii</span> 
        disponibile
      </div>

      <div v-if="results.length > 0" class="mt-2">
        <component :is="cardComponent"
          v-for="result in results"
          :key="result.id"
          v-bind="result"
        ></component>
      </div>
      <div v-else class="mt-12 text-center font-bold">
        <ResultsNotFound></ResultsNotFound>
      </div>
    </div>
  </div>
</template>