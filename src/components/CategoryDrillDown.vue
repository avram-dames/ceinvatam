<script setup>
import { ref, computed } from 'vue';
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
    <h2 v-if="showCategories" class="text-center">Categorii</h2>
    <div v-else>
      <h2 class="text-center">Topics</h2>
      <div
        @click="showCategories = true"
        class="mt-4 text-right w-full text-gray-600 cursor-pointer"
      >
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