<script setup>
import ClassCard from "../components/ClassCard.vue";
import SearchResultFilterTagsVue from "../components/SearchResultFilterTags.vue";
import SearchResultFilterTags from "../components/SearchResultFilterTags.vue";
</script>

<template>
  <div>
      <SearchResultFilterTags></SearchResultFilterTags>
  </div>
  <div class="mt-8">
    <ClassCard></ClassCard>
    <ClassCard></ClassCard>
    <ClassCard></ClassCard>
  </div>
</template>