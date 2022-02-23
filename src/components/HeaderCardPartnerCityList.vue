<script async setup>
import supabase from "../utils/supabase";

const props = defineProps({
  partnerId: Number,
});

async function getAddressInfo(id) {
  const { data: addresses, error } = await supabase
    .from('addresses')
    .select('cities(name)')
    .eq('partner_id', id)

  if (error) throw error

  return addresses
}
const data = await getAddressInfo(props.partnerId)
const cities = data.map((item) => item.cities.name).join(", ")
</script>

<template>
  <div class="mt-2">{{ cities }}</div>
</template>