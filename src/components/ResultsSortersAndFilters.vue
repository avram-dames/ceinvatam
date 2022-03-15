<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
  <div class="lg:flex lg:space-x-1">
    <!-- Sorters -->
    <div class="mt-1 flex overflow-x-auto hide-scroll-bar">
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
        :class="
          store.state.orderSearchBy.name ? ['bg-green-200', 'order-first', 'ml-0'] : ['ml-1']
        "
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
        :class="
          store.state.orderSearchBy.score ? ['bg-green-200', 'order-first', 'ml-0'] : ['ml-1']
        "
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
        :class="
          store.state.orderSearchBy.scoreCount ? ['bg-green-200', 'order-first', 'ml-0'] : ['ml-1']
          
        "
      >
        <span>Număr Evaluări</span>
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
          px-4
          py-1
          cursor-pointer
        "
        :class="
          store.state.filterSearchBy.online
            ? ['bg-blue-300', 'pr-2']
            : ''
        "
      >
        <span>Online</span>
         <svg v-if="store.state.filterSearchBy.online"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
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
          px-4
          py-1
          cursor-pointer
        "
        :class="
          store.state.filterSearchBy.offline
            ? ['bg-blue-300', 'pr-2']
            : ''
        "
      >
        <span>Offline</span>
         <svg v-if="store.state.filterSearchBy.offline"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
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
          px-4
          py-1
          cursor-pointer
        "
        :class="
          store.state.filterSearchBy.demographic.adults
            ? ['bg-blue-300', 'pr-2']
            : ''
        "
      >
        <span>Adulți</span>
         <svg v-if="store.state.filterSearchBy.demographic.adults"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
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
         <svg v-if="store.state.filterSearchBy.demographic.teens"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
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
        <svg v-if="store.state.filterSearchBy.demographic.children"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
