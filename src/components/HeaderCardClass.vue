<script async setup>
import { ref, reactive } from "vue";

import HeaderCardClassCityList from "./HeaderCardClassCityList.vue";
import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";

const props = defineProps({
  classId: Number,
});

const reviewTxt = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita
  cupiditate, quasi quo aperiam consequatur, aliquam in dolorem
  dignissimos autem facere at quas repudiandae, enim officiis sunt magni
  veniam quos?`;

const items = [reviewTxt, reviewTxt, reviewTxt]

async function getPartnerInfo(id) {
  const apiUrl = `/api/class/${id}`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getPartnerInfo(props.classId);
const classInfo = ref(data[0]);
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

      <button class="px-2 py-1 bg-green-200 rounded-md">Adauga recenzie</button>
    </div>

    <div class="mt-16">
      <TabsWrapper>
        <Tab title="Descriere">
          <!-- Info -->
          <div class="mt-16">
            <h2>Despre Curs</h2>
            <p class="mt-4">
              {{ classInfo.description }}
            </p>
          </div>
        </Tab>
        <Tab title="Recenzii">
          <!-- Reviews -->
          <div class="mt-16">
            <h2>Recenzii</h2>
            <div v-for="item in items" :key="item">
              <h3 class="mt-4">Title</h3>
              <p class="mt-2">{{ item }}</p>
            </div>
            <div></div>
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
  </div>
</template>