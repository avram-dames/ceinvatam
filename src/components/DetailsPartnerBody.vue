<script async setup>
import { ref } from "vue";
import supabase from "../utils/supabase";

import TabsWrapper from "./TabsWrapper.vue";
import Tab from "./Tab.vue";
import ReviewCard from "./ReviewCard.vue";
import CardClassInfo from "./CardClassInfo.vue";

const props = defineProps({
  id: Number,
  about: String,
  homepage: String,
});

async function getPartnerClasses(partnerId) {
  let { data: classes, error } = await supabase
    .from("classes")
    .select(`id, name, duration, score, score_count`)
    .eq("partner_id", partnerId);

  if (error) throw error;
  return classes;
}

async function getReviews(partnerId) {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select("id, text, score, created_at, first_name, avatar_url")
    .eq("partner_id", partnerId)
    .eq("status", 'approved');

  if (error) throw error;

  return partner_reviews;
}

const classes = ref(await getPartnerClasses(props.id));
const reviews = ref(await getReviews(props.id));
</script>

<template>
  <TabsWrapper>
    <Tab title="Descriere">
      <!-- Info -->
      <div class="mt-8">
        <p v-if="about">
          {{ about }}
        </p>
        <p v-else>Momentan nu avem o descriere a acestei companii.</p>
        <p class="text-blue-600 hover:text-blue-400 visited:text-blue-200">
          <a :href="props.homepage" target="_">Viziteaza pagina companiei.</a>
        </p>
      </div>
    </Tab>
    <Tab title="Cursuri">
      <div class="mt-8">
        <div v-if="classes">
          <CardClassInfo
            v-for="cl in classes"
            :key="cl.id"
            v-bind="cl"
          ></CardClassInfo>
        </div>
        <div v-else>
          Momentan nu avem cursuri pentru această companie, în baza noastră de
          date.
        </div>
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
        <div v-else>
          Momentan nu există recenzii pentru această companie.
        </div>
      </div>
    </Tab>
  </TabsWrapper>
</template>