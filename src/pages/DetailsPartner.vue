<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import HeaderCardPartner from "../components/HeaderCardPartner.vue";
import HeaderCardFallback from "../components/HeaderCardFallback.vue";
import Navbar from "../components/Navbar.vue";

const router = useRouter();
const route = useRoute();
const partnerId = ref(Number(route.params.id));
</script>

<template>
  <Navbar class=""></Navbar>
  <Suspense>
    <template #default>
      <HeaderCardPartner :partnerId="partnerId"></HeaderCardPartner>
    </template>
    <template #fallback>
      <HeaderCardFallback></HeaderCardFallback>
    </template>
  </Suspense>
</template>