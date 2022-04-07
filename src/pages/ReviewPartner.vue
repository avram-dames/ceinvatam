<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewPartnerForm from "../components/ReviewPartnerForm.vue";
import AlertModal from "../components/AlertModal.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const partnerId = Number(route.params.partner_id);
const reviewId = Number(route.params.id);

const userId = ref(store.state.user.id);
const reviewScore = ref(0);
const reviewText = ref("");
const partnerName = ref("");

const alertModal = ref({
  isOpen: false,
  title: "",
  message: "",
});

function openAlertModal(title, message) {
  alertModal.value.isOpen = true;
  alertModal.value.title = title;
  alertModal.value.message = message;
}

function returnToPrevPage() {
  router.go(-1);
}

function handleError(error, message) {
  // alertMessages.value.push(message);
  // send error somewhere
  console.log(message);
  throw error;
}

// runs a remote procedure on postgres that updates the class score and score_count
async function updatePartnerScore(id) {
  const { data, error } = await supabase.rpc("update_partner_score", {
    partnerid: id,
  });

  if (error) {
    handleError(error, "error when updating the partner score");
  }
}

// when updating an existing review
async function fetchReviewInfo(id) {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select("text, score, partners(name)")
    .eq("id", id)
    .single();

  if (error) {
    openAlertModal(
      "Conexiune nereușită",
      "Recenzia pe care doriți să o editați nu există sau conexiunea cu baza de date nu se poate efectua la acest moment. Reveniți mai târziu."
    );
    handleError(error);
  }

  reviewScore.value = partner_reviews.score;
  reviewText.value = partner_reviews.text;
  partnerName.value = partner_reviews.partners.name;
}

// when creating a new review
async function fetchPartnerInfo(id) {
  let { data: partners, error } = await supabase
    .from("partners")
    .select("name")
    .eq("id", id)
    .single();

  if (error) {
    openAlertModal(
      "Conexiune nereușită",
      "Conexiune nereușită cu baza de date. Reveniți mai târziu."
    );
    handleError(error);
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

  if (error) {
    openAlertModal(
      "Conexiune nereușită",
      "Conexiune nereușită cu baza de date. Receniza nu a fost salvată. Reveniți mai târziu."
    );
    handleError(error);
  }

  router.push({
    name: "ReviewConfirmed",
    params: { entity: "partner", entity_id: partnerId },
  });
}

async function updateReview(id) {
  const { data, error } = await supabase
    .from("partner_reviews")
    .update({
      text: reviewText.value,
      score: reviewScore.value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    openAlertModal(
      "Conexiune nereușită",
      "Conexiune nereușită cu baza de date. Receniza nu a fost salvată. Reveniți mai târziu."
    );
    handleError(error);
  }

  router.push({ name: "CustomerReviews" });
}

function handleSubmit(reviewId) {
  if (route.path.includes("update")) {
    updateReview(reviewId);
  } else {
    createReview();
  }
  updatePartnerScore(partnerId);
}

async function checkIfUserLeftReviewAlready(partnerId, userId) {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select("text, score, partners(name)")
    .eq("partner_id", partnerId)
    .eq("user_id", userId)
    .single();
  console.log(partner_reviews)
  if (partner_reviews) {
    openAlertModal(
      "Recenzie existentă",
      "Deja ați lăsat o recenzie pentru această companie. Puteți modifica recenzia din secțiunea Contul meu -> Recenziile mele."
    );
  }
}

if (route.path.includes("create")) {
  fetchPartnerInfo(partnerId);
  checkIfUserLeftReviewAlready(partnerId, userId.value);
} else {
  fetchReviewInfo(reviewId);
}
</script>

<template>
  <div class="relative">
    <Navbar></Navbar>
    <ReviewPartnerForm
      :partnerName="partnerName"
      :sliderValue="reviewScore"
      :textAreaValue="reviewText"
      @update:sliderValue="(newValue) => (reviewScore = newValue)"
      @update:textAreaValue="(newValue) => (reviewText = newValue)"
      @submit="handleSubmit(reviewId)"
      @cancel="returnToPrevPage()"
    ></ReviewPartnerForm>
    <!-- Black overlay in order to make the modal pop -->
    <div
      v-if="alertModal.isOpen"
      class="bg-black z-10 opacity-80 w-full h-screen absolute top-0 left-0"
    ></div>
  </div>
  <AlertModal class="z-50" v-bind="alertModal"></AlertModal>
</template>