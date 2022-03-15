<script setup>
import { parseDate } from '../utils/parsers';
const props = defineProps(["partners", "classes", "text", "score", "created_at"]);

</script>

<template>
  <div class="w-full">
    <div class="flex pb-4 pt-1 justify-between">
      <div class="text-md font-semibold text-gray-600 pt-4">{{ partners?.name || classes?.name }}</div>
      <div class="px-4 py-2 bg-orange-400">{{ score }}</div>
    </div>
    <div class="text-gray-600">
      {{ text }}
    </div>
    <div class="text-sm text-right text-gray-400">{{ parseDate(created_at) }}</div>
  </div>
</template>