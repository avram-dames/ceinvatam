<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="px-4 mt-12">
    <p class="text-4xl font-bold">Mulțumim pentru recenzie!</p>
    <p class="text-2xl mt-8">
      Părerea ta va ajuta alte persoane să ia o decizie mai bună.
    </p>
    <p class="text-xl mt-12">Unde vrei să mergi mai departe?</p>
    <div class="flex space-x-4 mt-4">
      <button
        class="px-4 py-2 bg-gray-200 rounded-md"
        @click="router.push({ name: 'Home' })"
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