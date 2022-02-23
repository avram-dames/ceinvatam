<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex";

import Navbar from "../components/Navbar.vue";
import ClassCard from "../components/ClassCard.vue"
import SearchResultFilterTags from "../components/SearchResultFilterTags.vue"

const store = useStore()
const results = computed(() => store.getters.searchResults)
</script>

<template>
<Navbar class=""></Navbar>
  <div>
      <SearchResultFilterTags></SearchResultFilterTags>
  </div>
  <div class="mt-8">
      <ClassCard v-for="result in results" :key="result.id" v-bind="result"></ClassCard>
  </div>
</template>