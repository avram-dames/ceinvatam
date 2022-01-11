<script async setup>
import { ref } from "vue";

import HeaderCardPartnerCityList from "./HeaderCardPartnerCityList.vue"

const props = defineProps({
  partnerId: Number,
});

async function getPartnerInfo(id) {
  const apiUrl = `/api/partner/${id}`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getPartnerInfo(props.partnerId)
const partnerInfo = data[0]
</script>

<template>
  <div class="px-4 mt-4">
    <!-- Title -->
    <div>
      <h1>{{ partnerInfo.name }}</h1>
      <Suspense>
        <template #default>
          <HeaderCardPartnerCityList :partnerId="partnerId"></HeaderCardPartnerCityList>
        </template>
        <template #fallback>Cities Loading ...</template>
      </Suspense>
    </div>
    
    <!-- CTA -->
    <div class="mt-8 flex justify-between">
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">9</span>
        <span class="pl-1 pr-2">12 evaluări</span>
      </div>

      <button class="px-2 py-1 bg-green-200 rounded-md">Adauga recenzie</button>
    </div>

    <!-- Info -->
    <div class="mt-16">
      <h2>Despre Companie</h2>
      <p class="mt-4">
        {{ partnerInfo.about}}
      </p>
    </div>
  </div>

  
</template>