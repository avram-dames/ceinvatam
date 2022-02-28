<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import DetailsPartnerHeader from "../components/DetailsPartnerHeader.vue";
import DetailsHeaderFallback from "../components/DetailsHeaderFallback.vue";
import DetailsPartnerBody from "../components/DetailsPartnerBody.vue";

const route = useRoute();
const partnerInfo = ref({
  id: Number(route.params.id),
  name: '',
  about: '',
  score: 0,
  scoreCount: 0,
  homepage: '',
  cities: []
});

async function fetchPartnerInfo() {
  const { data: partners, error } = await supabase
    .from('partners')
    .select('name, about, homepage, score, score_count')
    .eq('id', partnerInfo.value.id)
    .single()
  
  if (error) throw error

  partnerInfo.value.name = partners.name
  partnerInfo.value.about = partners.about
  partnerInfo.value.homepage = partners.homepage
  partnerInfo.value.score = partners.score
  partnerInfo.value.scoreCount = partners.score_count
}

async function fetchPartnerCities() {
  const { data: addresses, error } = await supabase
    .from('addresses')
    .select('cities(name)')
    .eq('partner_id', partnerInfo.value.id)
  
  if (error) throw error

  partnerInfo.value.cities = addresses.map((item) => item.cities.name)
}

fetchPartnerInfo()
fetchPartnerCities()
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4">
    <Suspense>
      <template #default>
        <div class="flex flex-col space-y-12">
          <DetailsPartnerHeader v-bind="partnerInfo"></DetailsPartnerHeader>
          <DetailsPartnerBody v-bind="partnerInfo"></DetailsPartnerBody>
        </div>
      </template>
      <template #fallback>
        <DetailsHeaderFallback></DetailsHeaderFallback>
      </template>
    </Suspense>
  </div>
</template>