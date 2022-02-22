<script async setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import HeaderCardClassCityList from "./HeaderCardClassCityList.vue";
import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";
import ReviewCard from "./ReviewCard.vue";
import ReviewCardFallback from "./ReviewCardFallback.vue";

const props = defineProps({
  classId: Number,
});
const router = useRouter();

async function getPartnerInfo(id) {
  const apiUrl = `/api/class/${id}`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getPartnerInfo(props.classId);
const classInfo = ref(data[0]);

async function getReviews(classId) {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("id, text, score, created_at, first_name, avatar_url")
    .eq("class_id", classId);

  if (error) throw error;

  return class_reviews;
}

async function getCertifications(classId) {
  let { data: classes, error } = await supabase
    .from("classes")
    .select("certifications")
    .eq("id", classId)
    .single();

  if (error) throw error;

  return classes.certifications;
}

const reviews = ref(await getReviews(props.classId));
const certifications = ref(await getCertifications(props.classId));

function addReview() {
  router.push({ name: "ClassReview" });
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
              {{ classInfo.description }}
            </p>
            <p class="text-blue-600 hover:text-blue-400 visited:text-blue-200">
              <a :href="classInfo.url" target="_">Viziteaza pagina cursului</a>
            </p>
          </div>
        </Tab>
        <Tab title="Recenzii">
          <!-- Reviews -->
          <div class="mt-8 divide-y divide-solid">
            <ReviewCard
              v-for="review in reviews"
              v-bind="review"
              :key="review.id"
            ></ReviewCard>
          </div>
        </Tab>
        <Tab title="Certificări">
          <div class="px-4 mt-8">
            <ul>
              <li v-for="cert in certifications" :key="cert" class="list-disc">
                {{ cert }}
              </li>
            </ul>
          </div>
        </Tab>
      </TabsWrapper>
    </div>

    <!-- Call To Action -->
    <div class="mt-12 flex justify-around">
      <button class="px-4 py-2 w-full bg-purple-400 text-white rounded-md">
        Sunt interesat!
      </button>
    </div>
  </div>
</template>