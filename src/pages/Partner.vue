<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import HeaderCardPartner from "../components/HeaderCardPartner.vue";
import HeaderCardPartnerFallback from "../components/HeaderCardPartnerFallback.vue";

const router = useRouter();
const route = useRoute();
const partnerId = ref(Number(route.params.id));
</script>

<template>
  <Suspense>
    <template #default>
      <HeaderCardPartner :partnerId="partnerId"></HeaderCardPartner>
    </template>
    <template #fallback>
      <HeaderCardPartnerFallback></HeaderCardPartnerFallback>
    </template>
  </Suspense>
</template>