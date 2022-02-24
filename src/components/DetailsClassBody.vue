<script async setup>
import { ref } from "vue";
import supabase from "../utils/supabase";

import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";
import ReviewCard from "./ReviewCard.vue";
import ReviewCardFallback from "./ReviewCardFallback.vue";

const props = defineProps({
  id: Number,
  description: String,
  url: String,
});

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

const reviews = ref(await getReviews(props.id));
const certifications = ref(await getCertifications(props.id));

function addReview() {
  router.push({
    name: "ReviewClassCreate",
    params: { class_id: props.classId },
  });
}
</script>

<template>
  <TabsWrapper>
    <Tab title="Descriere">
      <!-- Info -->
      <div class="mt-8">
        <p class="">
          {{ description }}
        </p>
        <p class="text-blue-600 hover:text-blue-400 visited:text-blue-200">
          <a :href="props.url" target="_">Viziteaza pagina cursului.</a>
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

  <!-- Call To Action -->
  <div class="mt-12 flex justify-around">
    <button class="px-4 py-2 w-full bg-purple-400 text-white rounded-md">
      Sunt interesat!
    </button>
  </div>
</template>