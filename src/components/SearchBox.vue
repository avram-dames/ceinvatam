<script setup>
import { ref } from "vue";
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
</script>

<template>  
  <form action="" class="flex flex-col lg:space-x-2 space-y-4 lg:space-y-0 px-4 lg:flex-row">
    <input
      type="text"
      placeholder="ce dorești să înveți?"
      class="px-4 py-2 border border-gray-400 rounded-md lg:w-1/3 h-12"
    />
    <div class="lg:w-1/3">
    <SearchBoxMultiSelect></SearchBoxMultiSelect>
    </div>
    <button class="px-4 py-2 bg-green-400 rounded-md lg:w-48 h-12">Caută</button>
  </form>
</template>
