<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
const filtersSelected = computed(() => store.getters.filteresSelected);

function resetFilters() {
  store.dispatch('resetFilters')
}
</script>

<template>
  <div>
    <h2>Nu exista cursuri pentru aceasta cautare.</h2>
    <div class="mt-4 flex space-x-1 justify-center">
      <button class="py-2 pl-2 pr-4 bg-gray-300 rounded-md text-dark">
        <router-link to="/" class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          Înapoi</router-link
        >
      </button>
      <button class="py-2 pl-2 pr-4 bg-blue-300 rounded-md text-dark flex" @click="resetFilters">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        Resetează Filtre
      </button>
    </div>

    <p class="mt-16">Nu găsești compania pe care o cauți?</p>
    <button class="mt-4 py-2 px-4 bg-purple-400 rounded-md text-white">
      <router-link :to="{ name: 'ContactSubmitPartner' }"
        >Adaugă o companie</router-link
      >
    </button>
  </div>
</template>
