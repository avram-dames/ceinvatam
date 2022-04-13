<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewCardPersonal from "../components/ReviewCardPersonal.vue";

const store = useStore();
const router = useRouter();

const classReviews = ref();
const partnerReviews = ref();
const userAvatar = computed(() => store.getters.userAvatar)
const userFullName = computed(() => store.getters.userFullName)

async function updateClassScore(classId) {
  const { data, error } = await supabase.rpc("update_class_score", {
    classid: classId,
  });

  if (error) {
    console.log(error);
    alert("Error during update");
  }
}

async function updatePartnerScore(partnerId) {
  const { data, error } = await supabase.rpc("update_partner_score", {
    partnerid: partnerId,
  });

  if (error) {
    console.log(error);
    alert("Error during update");
  }
}

async function getClassReviews() {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select(
      "id, text, score, created_at, first_name, avatar_url, class_id, classes(name)"
    )
    .eq("user_id", store.state.user.id);

  classReviews.value = class_reviews;
}

async function getPartnerReviews() {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select(
      "id, text, score, created_at, first_name, avatar_url, partner_id, partners(name)"
    )
    .eq("user_id", store.state.user.id);

  partnerReviews.value = partner_reviews;
}

async function deleteClassReview(classId, reviewId) {
  const { data, error } = await supabase
    .from("class_reviews")
    .delete()
    .eq("id", reviewId);

  if (error) throw error;

  updateClassScore(classId);
  getClassReviews();
}

async function deletePartnerReview(partnerId, reviewId) {
  const { data, error } = await supabase
    .from("partner_reviews")
    .delete()
    .eq("id", reviewId);

  if (error) throw error;

  updatePartnerScore(partnerId);
  getPartnerReviews();
}

function editClassReview(class_id, review_id) {
  router.push({
    name: "ReviewClassUpdate",
    params: { class_id: class_id, id: review_id },
  });
}

function editPartnerReview(partner_id, review_id) {
  router.push({
    name: "ReviewPartnerUpdate",
    params: { partner_id: partner_id, id: review_id },
  });
}

getClassReviews();
getPartnerReviews();
</script>

<template>
  <Navbar class=""></Navbar>
  <Suspense>
    <template #default>
      <div class="px-4 py-12 m-auto max-w-md text-gray-600">
        <div class="flex flex-col items-center space-y-4">
          <img
            :src="userAvatar"
            alt="User Avatar"
            class="h-12 w-12 rounded-2xl object-cover"
          />
          <h2 class="text-3xl font-medium text-gray-800">
            {{ userFullName }}
          </h2>
        </div>
        <h2 class="text-center mt-8">Recenzii Cursuri</h2>
        <div class="mt-4 flex flex-col space-y-4 divide-y divide-solid">
          <div v-for="review in classReviews" :key="review.id">
            <ReviewCardPersonal v-bind="review"></ReviewCardPersonal>
            <div class="flex justify-end space-x-4">
              <button
                id="edit-icon"
                @click="editClassReview(review.class_id, review.id)"
              >
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
              <button
                class="delete-icon"
                @click="deleteClassReview(review.class_id, review.id)"
              >
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

        <h2 class="text-center mt-12">Recenzii Academii</h2>
        <div class="mt-8 flex flex-col space-y-4 divide-y divide-solid"></div>
        <div v-for="review in partnerReviews" :key="review.id">
          <ReviewCardPersonal v-bind="review"></ReviewCardPersonal>
          <div class="flex justify-end space-x-4">
            <button
              id="edit-icon"
              @click="editPartnerReview(review.partner_id, review.id)"
            >
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
            <button
              class="delete-icon"
              @click="deletePartnerReview(review.partner_id, review.id)"
            >
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