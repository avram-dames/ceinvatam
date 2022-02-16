<script async setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import supabase from "../utils/supabase";

import Slider from "@vueform/slider";

const router = useRouter();
const route = useRoute();

const classReviewId = Number(route.params.id)
const sliderValue = ref(0);
const textAreaValue = ref('');

async function fetchReviewData() {
  let { data: class_reviews, error } = await supabase
    .from("class_reviews")
    .select("text, score")
    .eq("id", classReviewId)
    .single();

  if (error) throw error

  sliderValue.value = class_reviews.score
  textAreaValue.value = class_reviews.text
}

async function editReview() {
  const { data, error } = await supabase
    .from("class_reviews")
    .update({

      text: textAreaValue.value,
      score: Number(sliderValue.value),
      updated_at: new Date().toISOString()
    })
    .eq("id", classReviewId);

  if (error) throw error;

  router.push({ name: "CustomerReviews" });
}

fetchReviewData()
</script>

<template>
  <div class="px-4 mt-12">
    <h1>Spune-ne ce crezi despre acest curs?</h1>
    <div class="mt-12">
      <h3 class="text-xl">Cum evaluezi cursul?</h3>
      <div class="mt-12 px-4">
        <Slider v-model="sliderValue" :min="0" :max="10" />
      </div>
    </div>
    <div class="mt-12">
      <h3 class="text-xl">Lasă-ne o recenzie publică!</h3>
      <textarea
        class="w-full border-solid border-2 px-2 py-1 mt-4 text-lg"
        v-model="textAreaValue"
        id="review"
        name="review"
        rows="5"
        placeholder="Recenzia ta aici ..."
      ></textarea>
    </div>
    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 bg-gray-200 rounded-md">Anulează</button>
      <button class="px-4 py-2 bg-green-200 rounded-md" @click="editReview()">
        Salvează Evaluarea
      </button>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>