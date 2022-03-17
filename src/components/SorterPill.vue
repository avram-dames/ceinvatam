<script setup>
import ArrowDown from "./icons/ArrowDown.vue";
const props = defineProps({
  title: String,
  isActive: Boolean,
})

defineEmits(['sortBy'])
</script>

<template>
      <div
        @click="$emit('sortBy')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          pl-4
          py-1
          cursor-pointer
        "
        :class="isActive ? ['bg-green-200', 'pr-2'] : ['pr-4']"
      >
        <span>{{ title }}</span>
        <ArrowDown v-if="isActive" class="h-5 w-5"></ArrowDown>
      </div>
</template>