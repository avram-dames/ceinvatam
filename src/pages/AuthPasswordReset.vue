<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";

const router = useRouter();
const store = useStore();
const email = computed(() => store.getters.userEmail)
const password = ref("")

async function updateUserPassword() {
  const { user, error } = await supabase.auth.update({
    password: password.value
  });

  if (error) throw error;

  router.push({name: "Home"})
}
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-4xl font-bold text-gray-800">Creare parolă nouă</h2>
    <!-- Email Login -->
    <form @submit.prevent="updateUserPassword()">
      <!-- Email Input -->
      <div class="flex flex-col space-y-2 mt-12">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="p-2 border rounded-md"
          disabled
          :value="email"
        />
        <!-- Password Input -->

        <label for="password">Parolă</label>
        <input
          type="password"
          name="password"
          id="password"
          class="p-2 border rounded-md"
          v-model="password"
          required
          placeholder="Parola"
        />
      </div>
      <!-- Submit -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full">
        Schimbă Parola
      </button>
    </form>
  </div>
</template>