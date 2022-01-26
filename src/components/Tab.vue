<script setup>
import { inject } from "vue";

const props = defineProps(['title'])
const selectedTitle = inject('selectedTitle')


</script>

<template>
  <div class="" v-show="title == selectedTitle">
    <slot />
  </div>
</template>