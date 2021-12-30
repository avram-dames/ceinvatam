
<script setup>
import { ref } from "vue";
import store from "../store";

import ClassCard from "../components/ClassCard.vue";
import SearchBox from "../components/SearchBox.vue";


const showHelper = ref(false);
const helperMessage = ref("");

async function getSuggestions() {
  const apiUrl = "/api/searchsuggestions";
  const response = await fetch(apiUrl);

  if (response.status !== 200) {
    showHelper.value = true;
    helperMessage.value = "Unable to load search suggestions.";
    return 0;
  }

  const data = await response.json();
  store.setSearchSuggestions(data.suggestions);
}

getSuggestions();
</script>

<template>
  <div class="flex flex-col">
    <div class="mt-32">
      <h1 class="px-4 text-4xl">Descoperă cursul potrivit pentru tine</h1>
      <SearchBox class="mt-12"></SearchBox>
      <p v-show="showHelper" class="px-4 mt-4 text-red-500">{{ helperMessage }}</p>
    </div>

    <!-- <div class="mt-32">
      <h2 class="text-center">Categorii</h2>
      <div class="flex space-x-4 justify-center mt-8">
        <div class="flex bg-red-200 w-40 h-40 justify-center items-center">
          <div class="border">IT</div>
        </div>
        <div class="flex bg-yellow-200 w-40 h-40 justify-center items-center">
          <div class="border">Beauty</div>
        </div>
      </div>
    </div> -->
  </div>
</template>