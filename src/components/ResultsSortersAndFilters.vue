<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <div class="lg:flex lg:space-x-2">
    <!-- Sorters -->
    <div class="flex space-x-1 overflow-x-auto hide-scroll-bar">
      <!-- Sort by name -->
      <div
        @click="store.dispatch('orderResultsByName')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-green-200': store.state.orderSearchBy.name }"
      >
        <span>Nume</span>
      </div>

      <!-- Sort by score -->
      <div
        @click="store.dispatch('orderResultsByScore')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-green-200': store.state.orderSearchBy.score }"
      >
        <span>Nota</span>
      </div>

      <!-- Sort by score count -->
      <div
        @click="store.dispatch('orderResultsByScoreCount')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-green-200': store.state.orderSearchBy.scoreCount }"
      >
        <span>Număr Evaluări</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-1 flex space-x-1 overflow-x-auto hide-scroll-bar">
      <div
        @click="store.dispatch('showOnlyOnlineClasses')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-blue-300': store.state.filterSearchBy.online }"
      >
        <span>Online</span>
      </div>

      <div
        @click="store.dispatch('showOnlyOfflineClasses')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-blue-300': store.state.filterSearchBy.offline }"
      >
        <span>Offline</span>
      </div>

      <div
        @click="store.dispatch('showOnlyAdultsClasses')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-blue-300': store.state.filterSearchBy.demographic.adults }"
      >
        <span>Adulți</span>
      </div>

      <div
        @click="store.dispatch('showOnlyTeensClasses')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-blue-300': store.state.filterSearchBy.demographic.teens }"
      >
        <span>Adolescenți</span>
      </div>

      <div
        @click="store.dispatch('showOnlyChildrenClasses')"
        class="
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
          cursor-pointer
        "
        :class="{ 'bg-blue-300': store.state.filterSearchBy.demographic.children }"
      >
        <span>Copii</span>
      </div>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
