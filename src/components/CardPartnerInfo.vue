<script setup>
const props = defineProps({
  id: Number,
  score: Number,
  score_count: Number,
  name: String,
  cities: Array,
  target_demographic: Array[String]
})

const targetDemographicBgColor = {
  'Adults': 'bg-purple-100',
  'Teens': 'bg-yellow-100',
  'Children': 'bg-green-100',
  'All Ages': 'bg-blue-100',
}
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

    <div class="flex space-x-1">
      <span
        v-for="target in target_demographic"
        :key="target"
        class="text-sm rounded-lg px-2 text-gray-500"
        :class="targetDemographicBgColor[target]"
        >{{ target }}</span
      >
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