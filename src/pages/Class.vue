<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import HeaderCardPartnerClass from "../components/HeaderCardClass.vue";
import HeaderCardPartnerFallback from "../components/HeaderCardPartnerFallback.vue";
import HeaderCardClass from "../components/HeaderCardClass.vue";

const router = useRouter();
const route = useRoute();
const classId = ref(Number(route.params.id));
</script>

<template>
  <Navbar class=""></Navbar>
  <Suspense>
    <template #default>
      <HeaderCardClass :classId="classId"></HeaderCardClass>
    </template>
    <template #fallback>
      <HeaderCardPartnerFallback></HeaderCardPartnerFallback>
    </template>
  </Suspense>
</template>