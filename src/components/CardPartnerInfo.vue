<script setup>
const props = defineProps({
  id: Number,
  score: Number,
  score_count: Number,
  name: String,
  cities: Array,
})
</script>

<template>
  <router-link :to="{ name: 'Partner', params: { id: id }}">
    <div class="mt-2">
      <p></p>
    </div>

    <div class="mt-2 cursor-pointer">
      <h2>{{ name }}</h2>
      <p class="truncate text-sm text-gray-400">{{ cities.join(', ') }}</p>
    </div>

    <div class="flex justify-between mt-4">
      <span></span>
      <div>
        <span v-show="score" class="text-white px-2 py-1 bg-purple-700 rounded-md">{{ score }}</span>
        <span class="pl-1 pr-2">{{ score_count? score_count : 0 }} evaluări</span>
      </div>
    </div>
  </router-link>
  
  <div class="border-b border-gray-200 mt-4"></div>
</template>