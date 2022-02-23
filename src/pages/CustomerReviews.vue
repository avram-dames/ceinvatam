<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewCard from "../components/ReviewCard.vue";

const store = useStore();
const router = useRouter();

const reviews = ref();

async function getData() {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("id, text, score, created_at, first_name, avatar_url, class_id")
    .eq("user_id", store.state.user.id);

  if (class_reviews.length === 0) {
    downgradeUserFromReviewer()
    router.push({ name: 'Home' })
  }

  reviews.value = class_reviews;
}

async function downgradeUserFromReviewer() {
  const { user, error } = await supabase.auth.update({
    data: { is_reviewer: false },
  });

  if (error) throw error
}

async function deleteReview(reviewId) {
  const { data, error } = await supabase
    .from("class_reviews")
    .delete()
    .eq("id", reviewId);

  if (error) throw error;

  getData();
}

function editReview(class_id, review_id) {
  router.push({ path: `/details/class/${class_id}/review/${review_id}/update` })
}

getData();
</script>

<template>
  <Navbar class=""></Navbar>
  <Suspense>
    <template #default>
      <div class="p-4 flex flex-col space-y-4 divide-y divide-solid">
        <div v-for="review in reviews" :key="review.id">
          <ReviewCard v-bind="review"></ReviewCard>
          <div class="flex justify-end space-x-4">
            <button id="edit-icon" @click="editReview(review.class_id, review.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button class="delete-icon" @click="deleteReview(review.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>