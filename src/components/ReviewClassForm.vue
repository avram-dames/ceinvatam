<script async setup>
import Slider from "@vueform/slider";

defineProps({
  className: String,
  sliderValue: Number,
  textAreaValue: String,
});

const emit = defineEmits(["update:sliderValue", "update:textAreaValue", "submit", "cancel"]);

function handleEventSlider(value) {
  emit('update:sliderValue', Number(value))
}
</script>

<template>
  <div class="px-4 mt-12">
    <h1>Spune-ne ce crezi despre {{ className }}</h1>
    <div class="mt-12">
      <h3 class="text-xl">Cum evaluezi acest curs?</h3>
      <div class="mt-12 px-4">
        <Slider
          v-model="sliderValue"
          :min="0"
          :max="10"
          @change="handleEventSlider"
        />
      </div>
    </div>
    <div class="mt-12">
      <h3 class="text-xl">Lasă-ne o recenzie publică!</h3>
      <textarea
        class="w-full border-solid border-2 px-2 py-1 mt-4 text-lg"
        v-model="textAreaValue"
        @input="$emit('update:textAreaValue', $event.target.value)"
        id="review"
        name="review"
        rows="5"
        placeholder="Recenzia ta aici ..."
      ></textarea>
    </div>
    <div class="flex justify-end space-x-4">
      <button class="px-4 py-2 bg-gray-200 rounded-md" @click="$emit('cancel')">
        Anulează
      </button>
      <button
        class="px-4 py-2 bg-green-200 rounded-md"
        @click="$emit('submit')"
      >
        Salvează Evaluarea
      </button>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>