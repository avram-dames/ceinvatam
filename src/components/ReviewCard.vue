<script setup>
const props = defineProps([
  'first_name',
  'avatar_url',
  'text',
  'score',
  'created_at'
])
</script>

<template>
  <div class="flex space-x-4 py-4">
    <div class="flex-none">
      <img :src="avatar_url" alt="User's profile picture." class="h-12 w-12 rounded-2xl object-cover">
    </div>
    <div class="w-full">
      <div class="flex pb-4 pt-1 justify-between">
        <div>{{ first_name }}</div>
        <div class="px-4 py-2 bg-orange-400">{{ score }}</div>
      </div>
      <div>
        {{ text }}
      </div>
      <div class="text-sm text-right text-gray-400">{{ created_at }}</div>
    </div>
  </div>
</template>