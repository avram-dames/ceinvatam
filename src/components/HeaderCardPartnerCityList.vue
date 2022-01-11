<script async setup>
import { ref } from "vue";

const props = defineProps({
  partnerId: Number,
});

async function getAddressInfo(id) {
  const apiUrl = `/api/partner/${id}/addresses`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getAddressInfo(props.partnerId)
const cities = data.map((item) => item.cities.name).join(", ")
</script>

<template>
  <div class="mt-2">{{ cities }}</div>
</template>