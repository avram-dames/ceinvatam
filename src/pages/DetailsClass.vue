<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import HeaderCardFallback from "../components/HeaderCardFallback.vue";
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
      <HeaderCardFallback></HeaderCardFallback>
    </template>
  </Suspense>
</template>