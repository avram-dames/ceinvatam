<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Navbar from "../components/Navbar.vue";
import DetailsClassCard from "../components/DetailsClassCard.vue";
import ResultsSortersAndFilters from "../components/ResultsSortersAndFilters.vue";

const store = useStore();
const results = computed(() => store.getters.searchResults);
</script>

<template>
  <Navbar></Navbar>
  <ResultsSortersAndFilters></ResultsSortersAndFilters>
  <DetailsClassCard
    v-for="result in results"
    :key="result.id"
    v-bind="result"
    class="mt-8"
  ></DetailsClassCard>
</template>