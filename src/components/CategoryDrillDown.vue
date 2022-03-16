<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import CategoryBoxes from "../components/CategoryDrillDownBoxes.vue";

const store = useStore();
const router = useRouter();

store.dispatch("fetchCategories");
store.dispatch("fetchTopics");

const showCategories = ref(true);
const categories = computed(() => store.state.categories);
const allTopics = computed(() => store.state.topics);
const topicDrillDown = ref([]);

function categoryDrillDown(category) {
  showCategories.value = false;
  topicDrillDown.value = allTopics.value.filter(
    (item) => item.category === category
  );
}

function showResultsByTopic(topic) {
  store.commit("switchOnSearchByTopic", topic);
  store.dispatch("fetchSearchResults");
  router.push({ name: "Results" });
}
</script>

<template>
  <div>
    <h2 v-if="showCategories" class="">Cauta dupa categorii</h2>
    <div v-else>
      <h2 class="">Alege o subcategorie</h2>
      <div
        @click="showCategories = true"
        class="mt-4 text-gray-600 cursor-pointer rounded-md flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Înapoi la categorii
      </div>
    </div>
    <CategoryBoxes
      v-if="showCategories"
      @drill-down-by="categoryDrillDown"
      :items="categories"
    ></CategoryBoxes>
    <CategoryBoxes
      v-else
      @drill-down-by="showResultsByTopic"
      :items="topicDrillDown"
    ></CategoryBoxes>
  </div>
</template>