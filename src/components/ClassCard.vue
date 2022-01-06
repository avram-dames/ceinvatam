<script setup>
import { ref } from "vue";

const props = defineProps({
  duration: String,
  score: Number,
  score_count: Number,
  name: String,
  partner: String,
  city_ids: Array,
  rank: Number,
  id: Number
})

const duration_obj = JSON.parse(props.duration)
</script>

<template>
  <div class="px-2">
    <div class="mt-2">
      <p>{{ partner }}</p>
    </div>

    <div class="mt-2">
      <h2>{{ name }}</h2>
    </div>

    <div class="flex justify-between mt-4">
      <span>{{ duration_obj.ro }}</span>
      <div>
        <span v-show="score" class="text-white px-2 py-1 bg-purple-700 rounded-md">{{ score }}</span>
        <span class="pl-1 pr-2">{{ score_count? score_count : 0 }} evaluări</span>
      </div>
    </div>
  </div>

  <div class="border-b border-gray-200 mt-4"></div>
</template>