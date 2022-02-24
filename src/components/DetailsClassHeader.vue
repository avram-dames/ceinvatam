<script async setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import CardCityList from "./CardCityList.vue";

const props = defineProps({
  id: Number,
  name: String,
  partnerId: Number,
  partnerName: String,
  cities: Array[String],
});
const router = useRouter();

function addReview() {
  router.push({
    name: "ReviewClassCreate",
    params: { class_id: props.id },
  });
}
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <div class="text-xl mt-2">
      <router-link :to="`/details/partner/${partnerId}`">{{ partnerName }}</router-link>
    </div>

    <Suspense>
      <template #default>
        <CardCityList :cities="cities"></CardCityList>
      </template>
      <template #fallback
        ><div class="mt-2 h-8 w-40 bg-gray-100"></div
      ></template>
    </Suspense>

    <div class="mt-8 flex justify-between">
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">9</span>
        <span class="pl-1 pr-2">12 evaluări</span>
      </div>
      <button class="px-2 py-1 bg-green-200 rounded-md" @click="addReview">
        Adauga recenzie
      </button>
    </div>
  </div>
</template>