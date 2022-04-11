<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import ArrowBack from "../components/icons/ArrowBack.vue";
import Home from "../components/icons/Home.vue";

const router = useRouter();
const route = useRoute();

</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 mt-12">
    <p class="text-4xl font-bold">Mulțumim pentru încredere!</p>
    <p class="text-2xl mt-8">
      Vei primi o ofertă personalizată prin email în maxim n zile lucrătoare.
    </p>
    <p class="text-xl mt-12">Unde vrei să mergi mai departe?</p>
    <div class="flex space-x-2 mt-4">
      <button
        class="px-4 py-2 bg-gray-200 rounded-md flex space-x-1"
        @click="router.push({ name: 'Class', params: { id: route.params.id } })"
      > 
        <ArrowBack></ArrowBack>
        <span>
        Pagina precedentă
        </span>
      </button>
      <button
        class="px-4 py-2 bg-green-200 rounded-md"
        @click="router.push({ name: 'Home' })"
      >
        Acasă
      </button>
    </div>
  </div>
</template>