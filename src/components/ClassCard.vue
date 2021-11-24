<script setup>
import { ref } from "vue";

const classDetails = ref({
        title: 'Software Testing and QA',
        company: 'LINK Academy',
        score: 8.3,
        duration: '252 ore',
        scoreCount: 95
})
</script>

<template>
  <div class="px-2">
    <div class="flex justify-between">
      <span>{{ classDetails.duration }}</span>
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">{{ classDetails.score }}</span>
        <span class="pl-2">{{ classDetails.scoreCount }} evaluări</span>
      </div>
    </div>

    <div class="mt-4">
      <h2>{{ classDetails.title }}</h2>
    </div>

    <div class="mt-4">
      <p>{{ classDetails.company }}</p>
    </div>
  </div>

  <div class="border-b border-gray-200 mt-4"></div>
</template>