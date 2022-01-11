<script setup>
import {ref} from "vue"
import ClassCard from "../components/ClassCard.vue"
import SearchResultFilterTags from "../components/SearchResultFilterTags.vue"
import store from "../store"


const results = ref(store.state.searchResults)

</script>

<template>
  <div>
      <SearchResultFilterTags></SearchResultFilterTags>
  </div>
  <div class="mt-8">
      <ClassCard v-for="result in results" :key="result.id" v-bind="result"></ClassCard>
  </div>
</template>