<script setup>
import { useStore } from "vuex";

import SorterPill from "./SorterPill.vue";
import FilterPill from "./FilterPill.vue";

const store = useStore();
</script>

<template>
  <div class="lg:flex lg:space-x-1">
    <!-- Sorters -->
    <div class="mt-1 flex overflow-x-auto hide-scroll-bar space-x-1">
      <SorterPill
        :isActive="store.state.orderSearchBy.name"
        :title="'Nume'"
        @sortBy="store.dispatch('orderResultsByName')"
      ></SorterPill>
      <SorterPill
        :isActive="store.state.orderSearchBy.score"
        :title="'Nota'"
        @sortBy="store.dispatch('orderResultsByScore')"
      ></SorterPill>
      <SorterPill
        :isActive="store.state.orderSearchBy.scoreCount"
        :title="'Număr Evaluări'"
        @sortBy="store.dispatch('orderResultsByScoreCount')"
      ></SorterPill>
    </div>

    <!-- Filters -->
    <div class="mt-1 flex overflow-x-auto hide-scroll-bar space-x-1">
      <FilterPill
        :title="'Online'"
        :isActive="store.state.filterSearchBy.online"
        :isVisible="!store.state.filterSearchBy.offline"
        @filterBy="store.dispatch('showOnlyOnlineClasses')"
      ></FilterPill>
      <FilterPill
        :title="'Offline'"
        :isActive="store.state.filterSearchBy.offline"
        :isVisible="!store.state.filterSearchBy.online"
        @filterBy="store.dispatch('showOnlyOfflineClasses')"
      ></FilterPill>
      <FilterPill
        :title="'Adulți'"
        :isActive="store.state.filterSearchBy.demographic.adults"
        :isVisible="
          !store.state.filterSearchBy.demographic.teens &&
          !store.state.filterSearchBy.demographic.children
        "
        @filterBy="store.dispatch('showOnlyAdultsClasses')"
      ></FilterPill>
      <FilterPill
        :title="'Adolescenți'"
        :isActive="store.state.filterSearchBy.demographic.teens"
        :isVisible="
          !store.state.filterSearchBy.demographic.adults &&
          !store.state.filterSearchBy.demographic.children
        "
        @filterBy="store.dispatch('showOnlyTeensClasses')"
      ></FilterPill>
      <FilterPill
        :title="'Copii'"
        :isActive="store.state.filterSearchBy.demographic.children"
        :isVisible="
          !store.state.filterSearchBy.demographic.adults &&
          !store.state.filterSearchBy.demographic.teens
        "
        @filterBy="store.dispatch('showOnlyChildrenClasses')"
      ></FilterPill>
    </div>
  </div>
</template>

<style>
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
