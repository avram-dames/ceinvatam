<script async setup>
import { ref } from "vue";

import HeaderCardClassCityList from "./HeaderCardClassCityList.vue"

const props = defineProps({
  classId: Number,
});

async function getPartnerInfo(id) {
  const apiUrl = `/api/class/${id}`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getPartnerInfo(props.classId)
const classInfo = data[0]
console.log(classInfo);
</script>

<template>
  <div class="px-4 mt-4">
    <!-- Title -->
    <div>
      <h1>{{ classInfo.name }}</h1>
      <div class="text-xl mt-2">{{ classInfo.partners.name }}</div>
      <Suspense>
        <template #default>
          <HeaderCardClassCityList :classId="classId"></HeaderCardClassCityList>
        </template>
        <template #fallback><div class="mt-2 h-8 w-40 bg-gray-100"></div></template>
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
        {{ classInfo.description }}
      </p>
    </div>
  </div>

  
</template>