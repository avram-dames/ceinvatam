<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
import store from "../store"

const router = useRouter();

const searchInput = ref("")

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

async function fetchData(query) {
  if (query) {
    console.log('Searching for ' + query + ' in the database')
  }
  const SB_API_URL = '/.netlify/functions/sbFetchClasses'
  const queryUrlParam = `?query=${query}`
  const filterUrlParam = store.state.cityFilter.map(id => '&filter=' + id).join('')
  
  let sbApiUrl = SB_API_URL + queryUrlParam
  if (store.state.cityFilter) {sbApiUrl += filterUrlParam}

  let resp = await fetch(sbApiUrl)
  let body = await resp.json()
  
  store.setSearchResults(body.data)
  router.push('results')
}

function searchClassesInDatabase() {
  console.log(`Searching for ${searchInput.value} classes.`)
  fetchData(searchInput.value)
}

</script>

<template>
  <form
    action=""
    v-on:submit.prevent="searchClassesInDatabase"
    class="flex flex-col lg:space-x-2 space-y-4 lg:space-y-0 px-4 lg:flex-row"
  >
    <input
      type="text"
      placeholder="ce dorești să înveți?"
      v-model="searchInput"
      class="px-4 py-2 border border-gray-400 rounded-md lg:w-1/3 h-12"
    />
    <div class="lg:w-1/3">
      <SearchBoxMultiSelect></SearchBoxMultiSelect>
    </div>
    <button class="px-4 py-2 bg-green-400 rounded-md lg:w-48 h-12">
      Caută
    </button>
  </form>
</template>
