<script setup>
import { useStore } from 'vuex';
import supabase from './utils/supabase';

const store = useStore();

// keeps the store in sync with the state of authentication
supabase.auth.onAuthStateChange((event, session) => {
  store.commit('storeUser', session?.user || null)
});
</script>

<template>
  <router-view></router-view>
  <div class="h-12"></div>
</template>