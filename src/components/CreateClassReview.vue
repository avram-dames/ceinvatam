<script async setup>
import { ref } from "vue";
import Slider from "@vueform/slider";
import { useRouter } from "vue-router";

const router = useRouter()
const sliderValue = ref(0);
const textAreaValue = ref('');

function submitReview() {
  router.push({name: 'ClassReviewThankYou'})
}
</script>

<template>
  <div class="px-4 mt-12">
    <h1>Spune-ne ce crezi despre acest curs?</h1>
    <div class="mt-12">
      <h3 class="text-xl">Cum evaluezi cursul?</h3>
      <div class="mt-12 px-4">
        <Slider v-model="sliderValue" :min="0" :max="10"/>
      </div>
    </div>
    <div class="mt-12">
      <h3 class="text-xl">Lasă-ne o recenzie publică!</h3>
      <textarea
        class="w-full border-solid border-2 px-2 py-1 mt-4 text-lg"
        v-model="textAreaValue"
        id=""
        name=""
        rows="5"
        placeholder="Recenzia ta aici ..."
      ></textarea>
    </div>
    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 bg-gray-200 rounded-md">Anulează</button>
      <button class="px-4 py-2 bg-green-200 rounded-md" @click="submitReview">
        Adaugă Evaluarea
      </button>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>