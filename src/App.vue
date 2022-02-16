<script setup>
import { useStore } from 'vuex';
import supabase from './utils/supabase';

const store = useStore();

supabase.auth.onAuthStateChange((event, session) => {
  store.commit('storeUser', session?.user || null)
});

</script>

<template>
  <router-view></router-view>
  <div class="h-12"></div>
</template>

<style>
#app {
}
</style>
