<script setup>
import { ref } from "vue";
import Multiselect from '@vueform/multiselect'

components: {Multiselect}

const value = ref(null)
const options =  ['list', 'of', 'options']

</script>

<template>

<div>
    <multiselect
      v-model="value"
      mode="multiple"
      placeholder="Select your characters"
      :options="options"
    >
      <template v-slot:multipleLabel="{ values }">
        <div class="multiselect-multiple-label">
          {{ values.length }} characters selected
        </div>
      </template>
    </multiselect>
  </div>
</template>