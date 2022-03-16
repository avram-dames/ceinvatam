<script setup>
import { useStore } from "vuex";

import Home from "../pages/Home.vue";

import ArrowDown from "./icons/ArrowDown.vue";
import Close from "./icons/Close.vue";

const store = useStore();
</script>

<template>
  <div class="lg:flex lg:space-x-1">
    <!-- Sorters -->
    <div class="mt-1 flex overflow-x-auto hide-scroll-bar space-x-1">
      <!-- Sort by name -->
      <div
        @click="store.dispatch('orderResultsByName')"
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
        :class="
          store.state.orderSearchBy.name ? ['bg-green-200', 'pr-2'] : ['pr-4']
        "
      >
        <span>Nume</span>
        <ArrowDown v-if="store.state.orderSearchBy.name" class="h-5 w-5"></ArrowDown>
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
          pl-4
          py-1
          cursor-pointer
        "
        :class="
          store.state.orderSearchBy.score ? ['bg-green-200', 'pr-2'] : ['pr-4']
        "
      >
        <span>Nota</span>
        <ArrowDown v-if="store.state.orderSearchBy.score" class="h-5 w-5"></ArrowDown>
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
          pl-4
          py-1
          cursor-pointer
        "
        :class="
          store.state.orderSearchBy.scoreCount ? ['bg-green-200', 'pr-2'] : ['pr-4']
          
        "
      >
        <span>Număr Evaluări</span>
        <ArrowDown v-if="store.state.orderSearchBy.scoreCount" class="h-5 w-5"></ArrowDown>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-1 flex overflow-x-auto hide-scroll-bar space-x-1">
      <div
        v-if="!store.state.filterSearchBy.offline"
        @click="store.dispatch('showOnlyOnlineClasses')"
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
          store.state.filterSearchBy.online
            ? ['bg-blue-300', 'pr-2']
            : ['pr-4']
        "
      >
        <span>Online</span>
        <Close v-if="store.state.filterSearchBy.online" class="h-5 w-5"></Close>
      </div>

      <div
        v-if="!store.state.filterSearchBy.online"
        @click="store.dispatch('showOnlyOfflineClasses')"
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
        :class="
          store.state.filterSearchBy.offline
            ? ['bg-blue-300', 'pr-2']
            : ['pr-4']
        "
      >
        <span>Offline</span>
        <Close v-if="store.state.filterSearchBy.offline" class="h-5 w-5"></Close>
      </div>

      <div
        v-if="!store.state.filterSearchBy.demographic.teens && !store.state.filterSearchBy.demographic.children"
        @click="store.dispatch('showOnlyAdultsClasses')"
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
        :class="
          store.state.filterSearchBy.demographic.adults
            ? ['bg-blue-300', 'pr-2']
            : ['pr-4']
        "
      >
        <span>Adulți</span>
        <Close v-if="store.state.filterSearchBy.demographic.adults" class="h-5 w-5"></Close>
      </div>

      <div
        v-if="!store.state.filterSearchBy.demographic.adults && !store.state.filterSearchBy.demographic.children"
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
        :class="
          store.state.filterSearchBy.demographic.teens
            ? ['bg-blue-300', 'pr-2']
            : ''
        "
      >
        <span>Adolescenți</span>
        <Close v-if="store.state.filterSearchBy.demographic.teens" class="h-5 w-5"></Close>
      </div>

      <div
        v-if="!store.state.filterSearchBy.demographic.adults && !store.state.filterSearchBy.demographic.teens"
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
        :class="
          store.state.filterSearchBy.demographic.children
            ? ['bg-blue-300', 'pr-2']
            : ''
        "
      >
        <span>Copii</span>
        <Close v-if="store.state.filterSearchBy.demographic.children" class="h-5 w-5"></Close>
      </div>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
