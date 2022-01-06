<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
import SearchBoxTextInput from "./SearchBoxTextInput.vue";
import store from "../store";

const router = useRouter();
const searchText = ref("");
const searchCitySelection = ref([]);

const showHelper = ref(false);
const helperMessage = ref("");

function validateSearchInputs() {
  if (!searchText.value && searchCitySelection.value.length == 0) {
    showHelper.value = true;
    helperMessage.value = "Please select a city or a search phrase.";
    return false;
  }
  return true;
}

async function searchClasses() {
  const apiUrl = "/api/query";
  const apiRequestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        searchText: searchText.value,
        cityFilterIds: searchCitySelection.value,
      },
    }),
  };

  if (validateSearchInputs()) {
    let response = await fetch(apiUrl, apiRequestOptions);

    if (response.status !== 200) {
      showHelper.value = true;
      helperMessage.value = "Something went wrong. Please try again.";
      return 0;
    }

    const data = await response.json();

    if (data.data.length > 0) {
      store.setSearchResults(data.data);
      router.push("results");
    } else {
      showHelper.value = true;
      helperMessage.value =
        "There are no classes that meet your requirements. Please try again.";
      return 0;
    }
  }
}

function updateTextSearch(value) {
  searchText.value = value;
}
</script>

<template>
  <form
    @submit.prevent
    class="flex flex-col lg:space-x-2 space-y-4 lg:space-y-0 px-4 lg:flex-row"
  >
    <div class="lg:w-1/3">
      <SearchBoxTextInput v-model:search-text="searchText"></SearchBoxTextInput>
    </div>
    <div class="lg:w-1/3">
      <SearchBoxMultiSelect
        v-model:search-city-selection="searchCitySelection"
      ></SearchBoxMultiSelect>
    </div>
    <button
      @click="searchClasses"
      class="px-4 py-2 bg-purple-400 rounded-md lg:w-48 h-12"
    >
      Caută
    </button>
    <p v-show="showHelper" class="mt-4 text-red-500">{{ helperMessage }}</p>
  </form>
</template>