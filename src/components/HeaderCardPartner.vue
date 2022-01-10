<script setup>
import { ref } from "vue";

const props = defineProps({
  url: String,
});
</script>

<template>
  <div class="px-4 mt-4">
    <!-- Title -->
    <div>
      <h1>Link Academy</h1>

      <div class="mt-2">București, Timișoara, Chișinău</div>
    </div>
    
    <!-- CTA -->
    <div class="mt-8 flex justify-between">
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">9</span>
        <span class="pl-1 pr-2">12 evaluări</span>
      </div>

      <button class="px-2 py-1 bg-green-200 rounded-md">Adauga recenzie</button>
    </div>

    <!-- Info -->
    <div class="mt-16">
      <h2>Despre Companie</h2>
      <p class="mt-4">
        Cea mai practică școală pentru obținerea rapidă a unui loc de muncă în
        sectorul IT al unei companii autohtone sau străine Doriți un loc de
        muncă bine plătit în sectorul IT al unei companii de mărime mare sau
        medie? Poziția unui căutat leader al echipelor de proiect? Sau a unui
        specialist în calculatoare al unei ambițioase firme ”start up”?
      </p>
    </div>
  </div>
</template>