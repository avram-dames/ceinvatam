<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

const router = useRouter();
const route = useRoute();

const classId = ref(Number(route.params.id));
</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 mt-12">
    <p class="text-4xl font-bold">Mulțumim pentru recenzie!</p>
    <p class="text-2xl mt-8">
      Părerea ta va ajuta alte persoane să ia o decizie mai bună.
    </p>
    <p class="text-xl mt-12">Unde vrei să mergi mai departe?</p>
    <div class="flex space-x-4 mt-4">
      <button
        class="px-4 py-2 bg-gray-200 rounded-md"
        @click="router.push({ name: 'Class', params: { id: classId } })"
      >
        Detalii despre curs
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