<script setup>
import { parseDate } from '../utils/parsers';
const props = defineProps(["partners", "classes", "text", "score", "created_at", "color"]);
const color = props.partners ? 'yellow' : 'purple'
</script>

<template>
  <div class="w-full">
    <div class="flex pb-4 pt-1 justify-between mt-4">
      <div class="text-md font-semibold text-gray-800">{{ partners?.name || classes?.name }}</div>
      <div class="px-2 rounded-md text-white" :class="`bg-${color}-500`">{{ score }}</div>
    </div>
    <div class="text-gray-800">
      {{ text }}
    </div>
    <div class="text-sm text-right text-gray-400">{{ parseDate(created_at) }}</div>
  </div>
</template>