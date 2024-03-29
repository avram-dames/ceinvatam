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
    .eq("class_id", classId)
    .eq("status", "approved");

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

  return classes.certifications ? classes.certifications : [];
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
        <p v-if="description">
          {{ description }}
        </p>
        <p v-else>Momentan nu avem o descriere a acestui curs.</p>
        <p class="text-blue-600 hover:text-blue-400 visited:text-blue-200">
          <a :href="props.url" target="_">Vezi website-ul cursului.</a>
        </p>
      </div>
    </Tab>
    <Tab title="Recenzii">
      <div class="mt-8">
        <div v-if="reviews.length" class="divide-y divide-solid">
          <ReviewCard
            v-for="review in reviews"
            v-bind="review"
            :key="review.id"
          ></ReviewCard>
        </div>
        <div v-else>Momentan nu există recenzii pentru acest curs.</div>
      </div>
    </Tab>
    <Tab title="Certificări">
      <div class="mt-8">
        <div v-if="certifications.length" class="px-4">
          <ul>
            <li
              v-for="certification in certifications"
              :key="certification"
              class="list-disc"
            >
              {{ certification }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Nu avem informații despre certificări ofertie de acest curs.</p>
        </div>
      </div>
    </Tab>
  </TabsWrapper>

  <!-- Call To Action -->
  <div class="mt-12 flex justify-around">
    <router-link
      :to="{ name: 'ClassSignUp', id: props.id }"
      class="px-4 py-2 w-full bg-purple-400 text-white rounded-md text-center"
    >
      Sunt interesat!
    </router-link>
  </div>
</template>