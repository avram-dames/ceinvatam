<script setup>
import { useStore } from "vuex"

const store = useStore()
</script>

<template>
  <div class="lg:flex">
    <!-- Sorters -->
    <div class="px-2 flex space-x-1 overflow-x-auto hide-scroll-bar">
      <!-- Sort by name -->
      <div
        class="
          flex flex-shrink-0
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
        "
      >
        <span>Nume</span>
      </div>

      <div class="flex space-x-1 flex-shrink-0">
        <div
          class="flex items-center space-x-1 bg-green-200 rounded-2xl px-4 py-1"
        >
          <span>Nota</span
          ><i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </i>
        </div>

        <div
          class="
            flex flex-shrink-0
            items-center
            space-x-1
            bg-gray-200
            rounded-2xl
            px-4
            py-1
          "
        >
          <span>Durată</span>
        </div>

        <div
          class="
            flex-shrink-0 flex
            items-center
            space-x-1
            bg-gray-200
            rounded-2xl
            px-4
            py-1
          "
        >
          <span>Număr Evaluări</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="px-2 flex space-x-1 mt-2 lg:mt-0 lg:px-0">
      <div
        @click="store.commit('switchShowOnlyOnlineClasses')"
        class="flex items-center space-x-1 bg-gray-200 rounded-2xl px-4 py-1"
        :class="{ 'bg-blue-300': store.state.filterSearchBy.online }"
      >
        <span>Doar Online</span
        >
      </div>

      <div
        @click="store.commit('switchShowOnlyOfflineClasses')"
        class="flex items-center space-x-1 bg-gray-200 rounded-2xl px-4 py-1"
        :class="{ 'bg-blue-300': store.state.filterSearchBy.offline }"
      >
        <span>Doar Offline</span>
      </div>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
