<script async setup>
const props = defineProps({
  message: String
});
</script>

<template>
  <div v-if="message" class="flex py-2">
    <div class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="#ef4444"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="ml-1 text-gray-600 text-sm text-red-500">
      {{ message }}
    </div>
  </div>
</template>