<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import SearchBoxMultiSelect from "./SearchBoxMultiSelect.vue";
import SearchBoxTextInput from "./SearchBoxTextInput.vue";
import AlertError from "./AlertError.vue";

const store = useStore();
const router = useRouter();
const userInputIsEmpty = computed(() => store.getters.userInputIsEmpty);
const userInputIsEmptyAlert = ref("");

store.commit("clearSearchPhrase");
store.commit("clearFilterSearchByCityIds");
store.commit("clearSearchResults");

watchEffect(() => {
  if (!userInputIsEmpty.value) userInputIsEmptyAlert.value = "";
});

function fetchResultsAndGo2ResultsPage() {
  if (userInputIsEmpty.value) {
    userInputIsEmptyAlert.value = "Introdu cuvinte sau selectează un oraș";
    return;
  }
  store.commit("switchOffSearchByTopic");
  store.dispatch("fetchSearchResults");
  router.push({ name: "Results" });
}
</script>

<template>
  <div>
    <form
      @submit.prevent
      class="
        flex flex-col
        space-y-2
        lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-end
      "
    >
      <div class="lg:w-1/3">
        <div class="text-md text-gray-500">Ce dorești să înveți?</div>
        <SearchBoxTextInput></SearchBoxTextInput>
      </div>
      <div class="lg:w-1/3">
        <div class="text-md text-gray-500">Caută cursuri în:</div>
        <SearchBoxMultiSelect></SearchBoxMultiSelect>
      </div>
      <button
        @click="fetchResultsAndGo2ResultsPage"
        class="
          text-white
          bg-purple-400
          hover:bg-purple-300
          rounded-md
          lg:w-48
          h-12
        "
      >
        Caută
      </button>
    </form>
    <div class="h-14">
      <AlertError :message="userInputIsEmptyAlert"></AlertError>
    </div>
  </div>
</template>