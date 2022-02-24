<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Navbar from "../components/Navbar.vue";
import CardClassInfo from "../components/CardClassInfo.vue";
import ResultsSortersAndFilters from "../components/ResultsSortersAndFilters.vue";
import ResultsNotFound from "../components/ResultsNotFound.vue";

const store = useStore();
const results = computed(() => store.getters.searchResults);
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4">
    <ResultsSortersAndFilters></ResultsSortersAndFilters>
    <div class="mt-6 text-gray-400 text-right">
      <span>{{ results.length }} cursuri disponibile</span>
    </div>
    <Suspense>
      <template #default>
        <div v-if="results.length > 0" class="mt-2">
          <CardClassInfo
            v-for="result in results"
            :key="result.id"
            v-bind="result"
          ></CardClassInfo>
        </div>
        <div v-else class="mt-12 text-center font-bold">
          <ResultsNotFound></ResultsNotFound>
        </div>
      </template>
      <template #fallback>
        <p>Loading ...</p>
      </template>
    </Suspense>
  </div>
</template>