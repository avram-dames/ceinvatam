<script async setup>
import supabase from "../utils/supabase";

const props = defineProps({
  cities: Array[String],
});
</script>

<template>
  <div class="mt-2">{{ cities.join(', ') }}</div>
</template>