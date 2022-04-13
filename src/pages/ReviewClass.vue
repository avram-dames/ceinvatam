<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewClassForm from "../components/ReviewClassForm.vue";
import AlertModal from "../components/AlertModal.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const classId = Number(route.params.class_id);
const reviewId = Number(route.params.id);

const userId = ref(store.state.user.id);
const reviewScore = ref(0);
const reviewText = ref("");
const className = ref("");

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
  console.log(message)
  throw error;
}

// when updating an existing review
async function fetchReviewInfo(reviewId) {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("text, score, classes(name)")
    .eq("id", reviewId)
    .single();

  if (error) {
    openAlertModal(
      "Conexiune nereușită",
      "Recenzia pe care doriți să o editați nu există sau conexiunea cu baza de date nu se poate efectua la acest moment. Reveniți mai târziu."
    );
    handleError(error);
  }

  reviewScore.value = class_reviews.score;
  reviewText.value = class_reviews.text;
  className.value = class_reviews.classes.name;
}

// when creating a new review
async function fetchClassInfo(id) {
  let { data: classes, error } = await supabase
    .from("classes")
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

  className.value = classes.name;
}

// runs a remote procedure on postgres that updates the class score and score_count
async function updateClassScore(id) {
  const { data, error } = await supabase.rpc("update_class_score", {
    classid: id,
  });

  if (error) handleError(error);
}

async function createReview() {
  const { data, error } = await supabase.from("class_reviews").insert([
    {
      text: reviewText.value,
      class_id: classId,
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
    params: { entity: "class", entity_id: classId },
  });
}

async function updateReview(id) {
  const { data, error } = await supabase
    .from("class_reviews")
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

async function handleSubmit() {
  if (route.path.includes("update")) {
    await updateReview(reviewId);
  } else {
    await createReview();
  }
  updateClassScore(classId);
}

async function checkIfUserLeftReviewAlready(classId, userId) {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("score")
    .eq("class_id", classId)
    .eq("user_id", userId)
    .single();

  if (class_reviews) {
    openAlertModal(
      "Recenzie existentă",
      "Deja ați lăsat o recenzie pentru acest curs. Puteți modifica recenzia din secțiunea Contul meu -> Recenziile mele."
    );
  }
}

if (route.path.includes("create")) {
  fetchClassInfo(classId);
  checkIfUserLeftReviewAlready(classId, userId.value);
} else {
  fetchReviewInfo(reviewId);
}
</script>

<template>
  <div class="relative">
    <Navbar></Navbar>
    <ReviewClassForm
      :className="className"
      :sliderValue="reviewScore"
      :textAreaValue="reviewText"
      @update:sliderValue="(newValue) => (reviewScore = newValue)"
      @update:textAreaValue="(newValue) => (reviewText = newValue)"
      @submit="handleSubmit()"
      @cancel="returnToPrevPage()"
    ></ReviewClassForm>
    
    <!-- Black overlay in order to make the modal pop -->
    <div
      v-if="alertModal.isOpen"
      class="bg-black z-10 opacity-80 w-full h-screen absolute top-0 left-0"
    ></div>
  </div>
  <AlertModal class="z-50" v-bind="alertModal"></AlertModal>
</template>