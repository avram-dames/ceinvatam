<script setup>
import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 mt-12 lg:flex lg:flex-col lg:items-center">
    <p class="text-3xl font-medium">
      Verifică-ți adresa de email pentru instrucțiunile de resetare a parolei!
    </p>

    <router-link to="/">
    <button
      class="px-4 py-2 bg-purple-400 rounded-md mt-8 text-white text-lg w-full md:w-40"
    >
      Acasă
    </button>
    </router-link>
  </div>
</template>