<script setup>
import { ref } from "vue";

const props = defineProps({
  url: String,
});
</script>

<template>
  <div class="px-4">
    <!-- Title -->
    <div>
      <h1>Link Academy</h1>

      <span>București, Timișoara, Chișinău</span>
    </div>
    <!-- Info -->
    <div>
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">9</span>
        <span class="pl-1 pr-2">12 evaluări</span>
      </div>

      <button>Adauga recenzie</button>
    </div>
  </div>
</template>