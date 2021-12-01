<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  duration: String,
  score: Number,
  scoreCount: Number,
  title: String,
  company: String
})

console.log("Inside class card")
console.log(props)
</script>

<template>
  <div class="px-2">
    <div class="flex justify-between">
      <span>{{ duration }}</span>
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">{{ score }}</span>
        <span class="pl-2">{{ scoreCount }} evaluări</span>
      </div>
    </div>

    <div class="mt-4">
      <h2>{{ title }}</h2>
    </div>

    <div class="mt-4">
      <p>{{ company }}</p>
    </div>
  </div>

  <div class="border-b border-gray-200 mt-4"></div>
</template>