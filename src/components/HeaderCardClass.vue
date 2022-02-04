<script async setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import HeaderCardClassCityList from "./HeaderCardClassCityList.vue";
import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";
import ReviewCard from "./ReviewCard.vue";
import ReviewCardFallback from "./ReviewCardFallback.vue";


const props = defineProps({
  classId: Number,
});
const router = useRouter()


async function getPartnerInfo(id) {
  const apiUrl = `/api/class/${id}`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getPartnerInfo(props.classId);
const classInfo = ref(data[0]);

function addReview() {
  router.push({name: 'ClassReview'})
}
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
        <template #fallback
          ><div class="mt-2 h-8 w-40 bg-gray-100"></div
        ></template>
      </Suspense>
    </div>

    <!-- CTA -->
    <div class="mt-8 flex justify-between">
      <div>
        <span class="text-white px-2 py-1 bg-purple-700 rounded-md">9</span>
        <span class="pl-1 pr-2">12 evaluări</span>
      </div>
      <button class="px-2 py-1 bg-green-200 rounded-md" @click="addReview">Adauga recenzie</button>
    </div>

    <div class="mt-16">
      <TabsWrapper>
        <Tab title="Descriere">
          <!-- Info -->
          <div class="mt-8">
            <p class="">
              {{ classInfo.description }}
            </p>
          </div>
        </Tab>
        <Tab title="Recenzii">
          <!-- Reviews -->
          <div class="mt-8 divide-y divide-solid">
            <ReviewCard></ReviewCard>
            <ReviewCard></ReviewCard>
            <ReviewCard></ReviewCard>
          </div>
        </Tab>
        <Tab title="Certificări">
          <div class="mt-16">
            <h2>Certificări</h2>
            <p class="mt-4">
              Certificări
            </p>
          </div>
        </Tab>
      </TabsWrapper>
    </div>
    
    <div class="mt-12 flex justify-around">
      <a :href="classInfo.url" class="px-4 py-2 bg-blue-200 rounded-md">
        Viziteaza pagina cursului
        </a>
    </div>
  </div>
</template>