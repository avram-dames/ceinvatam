<script setup>
const props = defineProps(['items'])
const emit = defineEmits(['DrillDownBy'])

function drillDownBy(item) {
  emit('DrillDownBy', item)
}
</script>

<template>
    <div class="px-4 grid grid-cols-2 gap-4 place-items-center mt-8">
      <div
        v-for="item in items"
        :key="item"
        @click="drillDownBy(item.name)"
        class="
          flex flex-col
          space-y-2
          bg-red-200
          w-full
          h-40
          justify-center
          items-center
          rounded-md
          cursor-pointer
          hover:bg-red-100
        "
      >
        <div class="text-xl text-center">{{ item.name }}</div>
        <div class="text-gray-600 text-sm">
          {{ item.count }} cursuri
        </div>
      </div>
    </div>
</template>