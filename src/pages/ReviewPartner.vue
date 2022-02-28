<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewPartnerForm from "../components/ReviewPartnerForm.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const partnerId = Number(route.params.partner_id);
const reviewId = Number(route.params.id);

const userId = ref(store.state.user.id);
const reviewScore = ref(0);
const reviewText = ref("");
const partnerName = ref("");

async function upgradeUserToReviewer() {
  const { user, error } = await supabase.auth.update({
    data: { is_reviewer: true },
  });

  if (error) throw error;
}

async function updatePartnerScore(partnerId) {
  const { data, error } = await supabase
    .rpc("update_partner_score", {partnerid: partnerId})

  if (error) {
    console.log(error);
    alert("Error during update");
  }
}

// in case of updates
async function fetchReview() {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select("text, score, partners(name)")
    .eq("id", reviewId)
    .single();

  if (error) {
    console.log(error);
    alert("Resursa nu exista");
    returnToPrevPage()
  }

  reviewScore.value = partner_reviews.score;
  reviewText.value = partner_reviews.text;
  partnerName.value = partner_reviews.partners.name;
}

// when creating a new review
async function fetchPartnerInfo() {
  let { data: partners, error } = await supabase
    .from("partners")
    .select("name")
    .eq("id", partnerId)
    .single();

  if (error) {
    console.log(error);
    alert("Resursa nu exista");
    returnToPrevPage()
  }

  partnerName.value = partners.name;
}

async function createReview() {
  const { data, error } = await supabase.from("partner_reviews").insert([
    {
      text: reviewText.value,
      partner_id: partnerId,
      score: reviewScore.value,
      user_id: userId.value,
      first_name: store.getters.userFirstName,
      avatar_url: store.getters.userAvatar,
    },
  ]);

  if (error) throw error;

  upgradeUserToReviewer();

  router.push({
    name: "ReviewConfirmed",
    params: { entity: 'partner', entity_id: partnerId },
  });
}

async function updateReview() {
  const { data, error } = await supabase
    .from("partner_reviews")
    .update({
      text: reviewText.value,
      score: reviewScore.value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reviewId);

  if (error) throw error;

  router.push({ name: "CustomerReviews" });
}

function returnToPrevPage() {
  router.go(-1);
}

function handleSubmit() {
  if (route.path.includes("update")) {
    updateReview();
  } else {
    createReview();
  }
  updatePartnerScore(partnerId)
}

if (route.path.includes("update")) {
  fetchReview();
} else {
  fetchPartnerInfo();
}
</script>

<template>
  <Navbar></Navbar>
  <ReviewPartnerForm
    :partnerName="partnerName"
    :sliderValue="reviewScore"
    :textAreaValue="reviewText"
    @update:sliderValue="(newValue) => (reviewScore = newValue)"
    @update:textAreaValue="(newValue) => (reviewText = newValue)"
    @submit="handleSubmit()"
    @cancel="returnToPrevPage()"
  ></ReviewPartnerForm>
</template>