<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
import SearchBoxTextInput from "./SearchBoxTextInput.vue";
import { useStore } from "vuex";

const store = useStore(); 
const router = useRouter();

const showHelper = ref(false);
const helperMessage = ref("");

function showResults() {
  store.commit('switchOffSearchByTopic');
  store.dispatch('fetchSearchResults')
  router.push({name: "SearchResults"})
}

</script>

<template>
  <form
    @submit.prevent
    class="flex flex-col lg:space-x-2 space-y-4 lg:space-y-0 px-4 lg:flex-row"
  >
    <div class="lg:w-1/3">
      <SearchBoxTextInput></SearchBoxTextInput>
    </div>
    <div class="lg:w-1/3">
      <SearchBoxMultiSelect></SearchBoxMultiSelect>
    </div>
    <button
      @click.prevent
      @click="showResults"
      class="px-4 py-2 text-white bg-purple-400 hover:bg-purple-300 rounded-md lg:w-48 h-12"
    >
      Caută
    </button>
    <p v-show="showHelper" class="mt-4 text-red-500">{{ helperMessage }}</p>
  </form>
</template>