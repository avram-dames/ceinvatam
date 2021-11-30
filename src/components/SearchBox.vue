<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";

const router = useRouter();

const searchInput = ref("")

const searchResults = ref({})

const targetUsers = {
  0: "",
  1: "Copii",
  2: "Adulți",
  3: "Toate Vârstele"
}

const durationUnits = {
  0: "",
  1: "ore",
  2: "luni",
  3: "ani",
  4: "perioană nedeterminată"
}

const classes = [
  {
    id: 1,
    company: "LINK Academy",
    name: "Software Testing and QA",
    url: "https://www.link-academy.com/software-testing-and-qa-program-educational",
    domain: "IT",
    cities: ["București", "Timișoara", "Chișinău"],
    inPerson: true,
    online: false,
    targetUsers: [1, 2],
    duration: 188,
    durationUnit: 0,
    certificartions: [
      "ISTQB® - Foundation Level",
      "Cambridge International A&AS Level Computer Science",
      "LINK Academy Certified Software Testing and QA Engineer",
      "LINK English",
      "LINK German",
    ],
    description: "Software Testing and QA - stăpânește abilitățile bine plătite și devino expertul dorit de fiecare companie IT. Odată cu dezvoltarea programării și a complexității soluțiilor software, s-a ajuns la o cerere tot mai mare de verificare a corectitudinii, a calității și a vitezei de funcționare a produselor. Creșterea echipei, erorile frecvente, lucrul din mai multe locații, arhivarea fișierelor de proiect, optimizarea constantă și creșterea programului sunt doar câțiva dintre factorii care au dus la nevoia tot mai mare de joburi de software tester. Software Testing and Quality Assurance este procesul de căutare a erorilor (bugs) în sistemele sau programele computerizate pentru a se asigura că acestea îndeplinesc standardele necesare. Aceasta este una din carierele profitable din lumea IT, în care taskul vostru va fi să verificați dacă produsul software are calitatea corespunzătoare. Prin urmare, se recomandă tuturor perfecționiștilor sau celor cu ochi vigilent.",
  },
    {
    id: 2,
    company: "Friendly School",
    name: "Curs de limba engelză",
    url: "http://www.friendlyschool.md/",
    domain: "Limbi Străine",
    cities: ["Chișinău"],
    inPerson: true,
    online: true,
    targetUser: [1, 2],
    duration: 0,
    durationUnit: 0,
    certificartions: [],
    description: "",
  },
]

function searchClassesInDatabase() {
  console.log(`Searching for ${searchInput.value} classes.`)
  router.push('results')
}

</script>

<template>  
  <form action="" v-on:submit.prevent="searchClassesInDatabase" class="flex flex-col lg:space-x-2 space-y-4 lg:space-y-0 px-4 lg:flex-row">
    <input
      type="text"
      placeholder="ce dorești să înveți?"
      v-model="searchInput"
      class="px-4 py-2 border border-gray-400 rounded-md lg:w-1/3 h-12"
    />
    <div class="lg:w-1/3">
    <SearchBoxMultiSelect></SearchBoxMultiSelect>
    </div>
    <button type="submit" class="px-4 py-2 bg-green-400 rounded-md lg:w-48 h-12">Caută</button>
  </form>
</template>
