<script async setup>
const props = defineProps({
  classId: Number,
});

async function getCityList(id) {
  const apiUrl = `/api/class/${id}/cities`;
  const response = await fetch(apiUrl);
  return await response.json();
}
const { data } = await getCityList(props.classId)
const cities = data.map( (item) => item.cities.name).join(', ')
</script>

<template>
  <div class="mt-2">{{ cities }}</div>
</template>