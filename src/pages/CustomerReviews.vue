<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import ReviewCardPersonal from "../components/ReviewCardPersonal.vue";
import Edit from "../components/icons/Edit.vue";
import Trash from "../components/icons/Trash.vue";

const store = useStore();
const router = useRouter();

const classReviews = ref();
const partnerReviews = ref();
const userAvatar = computed(() => store.getters.userAvatar);
const userFullName = computed(() => store.getters.userFullName);

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
      "id, text, score, created_at, first_name, avatar_url, class_id, classes(name), status"
    )
    .eq("user_id", store.state.user.id);

  classReviews.value = class_reviews;
}

async function getPartnerReviews() {
  let { data: partner_reviews, error } = await supabase
    .from("partner_reviews")
    .select(
      "id, text, score, created_at, first_name, avatar_url, partner_id, partners(name), status"
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
            <div class="flex justify-end space-x-4 mt-2">
              <button
                id="edit-icon"
                @click="editClassReview(review.class_id, review.id)"
              >
              <Edit></Edit>
              </button>
              <button
                class="delete-icon"
                @click="deleteClassReview(review.class_id, review.id)"
              >
              <Trash></Trash>
              </button>
            </div>
          </div>
        </div>

        <h2 class="text-center mt-12">Recenzii Academii</h2>
        <div class="mt-4 flex flex-col space-y-4 divide-y divide-solid">
          <div v-for="review in partnerReviews" :key="review.id">
            <ReviewCardPersonal v-bind="review"></ReviewCardPersonal>
            <div class="flex justify-end space-x-4 mt-2">
              <button
                id="edit-icon"
                @click="editPartnerReview(review.partner_id, review.id)"
              >
                <Edit></Edit>
              </button>
              <button
                class="delete-icon"
                @click="deletePartnerReview(review.partner_id, review.id)"
              >
                <Trash></Trash>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>