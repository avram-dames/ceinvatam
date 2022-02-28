<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import DetailsClassHeader from "../components/DetailsClassHeader.vue";
import DetailsHeaderFallback from "../components/DetailsHeaderFallback.vue";
import DetailsClassBody from "../components/DetailsClassBody.vue";

const route = useRoute();
const classInfo = ref({
  id: Number(route.params.id),
  name: '',
  description: '',
  url: '',
  partnerId: null,
  partnerName: '',
  score: 0,
  scoreCount: 0,
  cities: []
});

async function fetchClassInfo() {
  const { data: classes, error } = await supabase
    .from('classes')
    .select('name, description, url, score, score_count, partners(id, name)')
    .eq('id', classInfo.value.id)
    .single()
  
  if (error) throw error

  classInfo.value.name = classes.name
  classInfo.value.description = classes.description
  classInfo.value.url = classes.url
  classInfo.value.partnerName = classes.partners.name
  classInfo.value.partnerId = classes.partners.id
  classInfo.value.score = classes.score
  classInfo.value.scoreCount = classes.score_count
}

async function fetchClassCities() {
  const { data: class2cities, error } = await supabase
    .from('class2cities')
    .select('cities(name)')
    .eq('class_id', classInfo.value.id)
  
  if (error) throw error

  classInfo.value.cities = class2cities.map((item) => item.cities.name)
}

fetchClassInfo()
fetchClassCities()
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4">
    <Suspense>
      <template #default>
        <div class="flex flex-col space-y-12">
          <DetailsClassHeader v-bind="classInfo"></DetailsClassHeader>
          <DetailsClassBody v-bind="classInfo"></DetailsClassBody>
        </div>
      </template>
      <template #fallback>
        <DetailsHeaderFallback></DetailsHeaderFallback>
      </template>
    </Suspense>
  </div>
</template>