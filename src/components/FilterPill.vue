<script setup>
import Close from "./icons/Close.vue";

const props = defineProps({
  title: String,
  isActive: Boolean,
  isVisible: Boolean
});

defineEmits(["filterBy"]);
</script>

<template>
  <div
    v-if="isVisible"
    @click="$emit('filterBy')"
    class="
      flex
      items-center
      space-x-1
      bg-gray-200
      rounded-2xl
      pl-4
      py-1
      cursor-pointer
      overflow-clip
    "
    :class="
      isActive ? ['bg-blue-300', 'pr-2'] : ['pr-4']
    "
  >
    <span>{{ title }}</span>
    <Close v-if="isActive" class="h-5 w-5"></Close>
  </div>
</template>