
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import Navbar from "../components/Navbar.vue";
import SearchBox from "../components/SearchBox.vue";
import CategoryDrillDown from "../components/CategoryDrillDown.vue";

const store = useStore();
const firstName = computed(() => store.getters.userFirstName);
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4">
    <h1 class="mt-12 text-3xl font-semibold">
      <span v-if="firstName">Bine ai venit, {{ firstName }}</span>
      <span v-else>Descoperă cursul potrivit pentru tine</span>
    </h1>
    <SearchBox class="mt-12"></SearchBox>
    <CategoryDrillDown class="mt-32"></CategoryDrillDown>
  </div>
</template>