<script async setup>
import { ref } from "vue";

import Slider from "@vueform/slider";
import AlertError from "./AlertError.vue";

const props = defineProps({
  className: String,
  sliderValue: Number,
  textAreaValue: String,
});

const emit = defineEmits([
  "update:sliderValue",
  "update:textAreaValue",
  "submit",
  "cancel",
]);

const sliderAlertMessage = ref("");
const textAreaAlertMessage = ref("");

// workaround - $emit from template didn't work
function handleEventSlider(value) {
  emit("update:sliderValue", Number(value));
}

function onSubmit() {
  if (props.sliderValue && props.textAreaValue) {
    emit("submit");
  }

  sliderAlertMessage.value =
    props.sliderValue < 1
      ? "Scorul trebuie să fie mai mare decât zero."
      : "";

  textAreaAlertMessage.value =
    props.textAreaValue === "" ? "Nu uita să lași o recenzie!" : "";
}
</script>

<template>
  <div class="px-4">
    <h1>Spune-ne ce crezi despre {{ className }}</h1>

    <h3 class="text-xl mt-10">Cum evaluezi acest curs?</h3>
    <!-- Slider -->
    <div class="px-2 pt-12">
      <Slider
        v-model="sliderValue"
        :min="0"
        :max="10"
        @change="handleEventSlider"
      />
    </div>
    <div class="h-14">
      <AlertError :message="sliderAlertMessage"></AlertError>
    </div>

    <h3 class="text-xl">Lasă-ne o recenzie publică!</h3>
    <!-- Text Area -->
    <textarea
      class="w-full border-solid border-2 px-2 py-1 mt-2 text-lg"
      v-model="textAreaValue"
      @input="$emit('update:textAreaValue', $event.target.value)"
      id="review"
      name="review"
      rows="5"
      placeholder="Recenzia ta aici ..."
    ></textarea>
    <div class="h-14">
      <AlertError :message="textAreaAlertMessage"></AlertError>
    </div>

    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 bg-gray-200 rounded-md" @click="$emit('cancel')">
        Anulează
      </button>
      <button class="px-4 py-2 bg-green-200 rounded-md" @click="onSubmit">
        Salvează Evaluarea
      </button>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>