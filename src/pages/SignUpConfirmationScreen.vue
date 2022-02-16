<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
const router = useRouter();
</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 mt-12">
    <p class="text-4xl font-bold">
      Verifică-ți adresa de email pentru mesajul de confirmare!
    </p>
    <p class="text-2xl mt-8">Mulțumim pentru încrederea în serviciul nostru!</p>

    <button
      class="px-4 py-2 bg-purple-400 rounded-md mt-8 text-white text-lg"
      @click="router.push({ name: 'Home' })"
    >
      Acasă
    </button>
  </div>
</template>