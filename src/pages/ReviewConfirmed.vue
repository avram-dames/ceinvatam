<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

const router = useRouter();
const route = useRoute();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const entityId = ref(Number(route.params.entity_id));
const entity = ref(capitalizeFirstLetter(route.params.entity))
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
        @click="router.push({ name: entity, params: { id: entityId } })"
      >
        Pagina precedentă
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