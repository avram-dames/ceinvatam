<script async setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import CardCityList from "./CardCityList.vue";

const props = defineProps({
  id: Number,
  name: String,
  score: Number,
  scoreCount: Number,
  cities: Array[String]
});
const router = useRouter();

function addReview() {
  router.push({
    name: "ReviewPartnerCreate",
    params: { partner_id: props.id },
  });
}
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    
    <Suspense>
      <template #default>
        <CardCityList :cities="cities"></CardCityList>
      </template>
      <template #fallback
        ><div class="mt-2 h-8 w-40 bg-gray-100"></div
      ></template>
    </Suspense>

    <div class="mt-8 flex justify-between">
      <div v-if="score">
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">{{ score }}</span>
        <span class="pl-1 pr-2">{{ scoreCount }} evaluări</span>
      </div>
      <div v-else>
        <span class="pl-1 pr-2">Nu există evaluări</span>
      </div>
      <button class="px-2 py-1 bg-green-200 rounded-md" @click="addReview">
        Adauga recenzie
      </button>
    </div>
  </div>
</template>