<script setup>
</script>

<template>
  <div>
    <h2>Nu exista cursuri pentru aceasta cautare.</h2>
    <div>
    <p class="text-md mt-4">Momentan nu există cursuri sau companii aferente căutării tale.</p>
    <p>În cazul în care cunoști o companie ce nu se află deja în baza
      noastră de date, poți să o adaugi.
    </p>
    </div>
    <div class="mt-8">
    <router-link :to="{ name: 'ContactSubmitPartner' }" class="p-4 bg-purple-400 rounded-md text-white">
      Adaugă o companie
    </router-link>
    </div>
  </div>
</template>
