<script async setup>
import supabase from "../utils/supabase";

const props = defineProps({
  classId: Number,
});

async function getCityList(id) {
  let { data: class2cities, error } = await supabase
    .from('class2cities')
    .select('cities (name)')
    .eq('class_id', id)

  if (error) throw error
  return class2cities
}
const data = await getCityList(props.classId)
const cities = data.map( (item) => item.cities.name).join(', ')
</script>

<template>
  <div class="mt-2">{{ cities }}</div>
</template>