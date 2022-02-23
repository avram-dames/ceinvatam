<script setup>
import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";
import notfound from "../assets/undraw_not_found_-60-pq.svg";
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 mt-12 lg:flex lg:flex-col lg:items-center">
    <p class="text-6xl font-bold">404</p>
    <p class="text-xl font-medium text-gray-600 mt-4">Pagina cerută nu există.</p>

    <div class="mt-8">
      <img :src="notfound" alt="Not Found Illustration" class="h-80" />
    </div>

    <router-link to="/">
      <button
        class="
          px-4
          py-2
          bg-purple-400
          rounded-md
          mt-8
          text-white text-lg
          w-full
          md:w-40
        "
      >
        Acasă
      </button>
    </router-link>
  </div>
</template>