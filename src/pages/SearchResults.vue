<script setup>
import ClassCard from "../components/ClassCard.vue";
import SearchResultFilterTagsVue from "../components/SearchResultFilterTags.vue";
import SearchResultFilterTags from "../components/SearchResultFilterTags.vue";
import store from "../store"

const results = store.state.searchResults
</script>

<template>
  <div>
      <SearchResultFilterTags></SearchResultFilterTags>
  </div>
  <div class="mt-8">
    <ClassCard v-for="result in results" :key="result.id" v-bind="result"></ClassCard>
  </div>
</template>