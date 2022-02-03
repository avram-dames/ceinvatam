
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import ClassCard from "../components/ClassCard.vue";
import SearchBox from "../components/SearchBox.vue";
import CategoryBoxes from "../components/CategoryBoxes.vue";

const store = useStore();
const router = useRouter();
const showHelper = ref(false);
const helperMessage = ref("");
const showCategories = ref(true);
const categories = computed(() => store.state.categories);
const allTopics = computed(() => store.state.topics);
const topicDrillDown = ref([]);

function categoryDrillDown(category) {
  showCategories.value = false;
  console.log(allTopics.value);
  topicDrillDown.value = allTopics.value.filter(
    (item) => item.category === category
  );
  console.log(topicDrillDown.value);
}

function showResultsByTopic(topic) {
  store.dispatch('fetchResultsByTopic', topic);
  router.push({name: 'SearchResults'})
}

store.dispatch("fetchSearchSuggestions");
store.dispatch("fetchCategories");
store.dispatch("fetchTopics");
</script>

<template>
  <div class="flex flex-col">
    <div class="mt-32">
      <h1 class="px-4 text-4xl">Descoperă cursul potrivit pentru tine</h1>
      <SearchBox class="mt-12"></SearchBox>
      <p v-show="showHelper" class="px-4 mt-4 text-red-500">
        {{ helperMessage }}
      </p>
    </div>

    <div class="mt-32">
      <h2 v-if="showCategories" class="text-center">Categorii</h2>
      <div v-else>
        <h2 class="text-center">Topics</h2>
        <div @click="showCategories = true" class="mt-4 pr-4 text-right w-full text-gray-600">
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
  </div>
</template>