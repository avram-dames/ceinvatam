<script async setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from '../utils/supabase';

import HeaderCardPartnerCityList from "./HeaderCardPartnerCityList.vue";
import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";
import ReviewCard from "./ReviewCard.vue";
import ReviewCardFallback from "./ReviewCardFallback.vue";
import ClassCard from "./ClassCard.vue";

const props = defineProps({
  partnerId: Number,
});
const router = useRouter();

async function getPartnerInfo(id) {
  let { data: partners, error } = await supabase
    .from("partners")
    .select(`id, name, about, homepage`)
    .eq('id', id)
    .limit(1)
    .single()
  if (error) throw error  
  return partners
}

async function getPartnerClasses(id) {
  let { data: classes, error } = await supabase
    .from("classes")
    .select(`id, name, duration, score, score_count`)
    .eq('partner_id', id)

  
  if (error) throw error  
  return classes
}

const partnerInfo = await getPartnerInfo(props.partnerId);
const classes = await getPartnerClasses(partnerInfo.id)

function addReview() {
  router.push({ name: "ClassReview" });
}
</script>

<template>
  <div class="px-4 mt-4">
    <!-- Title -->
    <div>
      <h1>{{ partnerInfo.name }}</h1>
      <Suspense>
        <template #default>
          <HeaderCardPartnerCityList
            :partnerId="partnerId"
          ></HeaderCardPartnerCityList>
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

      <button class="px-2 py-1 bg-green-200 rounded-md" @click="addReview">
        Adauga recenzie
      </button>
    </div>

    <div class="mt-16">
      <TabsWrapper>
        <Tab title="Descriere">
          <!-- Info -->
          <div class="mt-8">
            <p class="">
              {{ partnerInfo.about }}
            </p>
          </div>
        </Tab>
        <Tab title="Cursuri">
          <div class="mt-8">
          <ClassCard v-for="cl in classes" :key="cl.id" v-bind="cl"></ClassCard>
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
            <p class="mt-4">Certificări</p>
          </div>
        </Tab>
      </TabsWrapper>
    </div>

    <div class="mt-12 flex justify-around">
      <a :href="partnerInfo.homepage" class="px-4 py-2 bg-blue-200 rounded-md">
        Viziteaza pagina cursului
      </a>
    </div>
  </div>
</template>