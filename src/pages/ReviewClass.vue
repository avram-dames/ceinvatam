<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewClassForm from "../components/ReviewClassForm.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const classId = Number(route.params.class_id);
const reviewId = Number(route.params.id);

const userId = ref(store.state.user.id);
const reviewScore = ref(0);
const reviewText = ref("");
const className = ref("");

async function upgradeUserToReviewer() {
  const { user, error } = await supabase.auth.update({
    data: { is_reviewer: true },
  });

  if (error) throw error;
}

// in case of updates
async function fetchReview() {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("text, score, classes(name)")
    .eq("id", reviewId)
    .single();

  if (error) {
    console.log(error);
    alert("Resursa nu exista");
    returnToPrevPage()
  }

  reviewScore.value = class_reviews.score;
  reviewText.value = class_reviews.text;
  className.value = class_reviews.classes.name;
}

// when creating a new review
async function fetchClassInfo() {
  let { data: classes, error } = await supabase
    .from("classes")
    .select("name")
    .eq("id", classId)
    .single();

  if (error) {
    console.log(error);
    alert("Resursa nu exista");
    returnToPrevPage()
  }

  className.value = classes.name;
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

  if (error) throw error;

  upgradeUserToReviewer();

  router.push({
    name: "ReviewConfirmed",
    params: { entity: 'class', entity_id: classId },
  });
}

async function updateReview() {
  const { data, error } = await supabase
    .from("class_reviews")
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
}

if (route.path.includes("update")) {
  fetchReview();
} else {
  fetchClassInfo();
}
</script>

<template>
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
</template>