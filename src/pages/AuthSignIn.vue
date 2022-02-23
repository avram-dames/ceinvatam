<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";

import fbLogoUrl from "../assets/fb_logo.png";
import gLogoUrl from "../assets/g_logo.png";

const store = useStore();
const router = useRouter();
const route = useRoute();

const alerts = ref(store.state.alerts);
alerts.value.forEach((item) => alert(item.msg));
store.commit("deleteAlerts");

// seems to be a bug either in vuerouter or in my code
const props = defineProps(["redirect"]); // does not work
// untill the router query props bug is fixed, will use the state
store.commit("setRedirect", route.query.redirect); // this works

const form = ref({
  email: "",
  password: "",
});

const socialProviders = [
  { name: "Google", iconPath: gLogoUrl },
  { name: "Facebook", iconPath: fbLogoUrl },
];

async function loginWithEmail() {
  return await supabase.auth.signIn({
    email: form.value.email,
    password: form.value.password,
  });
}

async function loginWithSocial(provider) {
  return await supabase.auth.signIn({
    provider: provider,
  });
}

async function handleLogin(provider) {
  let { user, session, error } = provider
    ? await loginWithSocial(provider)
    : await loginWithEmail();

  if (error) {
    alert(error.message);
    throw error;
  }

  if (user) {
    router.push({ name: "Home" });
  }
}
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-4xl font-bold text-gray-800">Autentificare</h2>

    <!-- Social Login -->
    <div class="mt-8 flex flex-col">
      <button
        v-for="provider in socialProviders"
        :key="provider"
        class="border rounded-md p-2 mb-2 flex space-x-2"
        @click="handleLogin(provider.name)"
      >
        <span class="w-1/4 flex justify-end">
          <img
            :src="provider.iconPath"
            :alt="provider.name + ' Logo'"
            class="h-6"
        /></span>
        <span>Autentificare cu {{ provider.name }}</span>
      </button>
    </div>

    <div class="text-center my-4 text-gray-400">sau</div>

    <!-- Email Login -->
    <form @submit.prevent="handleLogin()">
      <!-- Email Input -->
      <div class="flex flex-col space-y-2">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          class="p-2 border rounded-md"
          required
          placeholder="name@email.com"
        />
        <!-- Password Input -->
        <div class="flex justify-between">
          <label for="password">Parolă</label>
          <!-- Forgot Password Link-->
          <router-link
            :to="'/auth/password/forgot?email=' + form.email"
            class="text-blue-600 hover:text-blue-400"
            >Am uitat parola.</router-link
          >
        </div>
        <input
          type="password"
          name="password"
          id="password"
          class="p-2 border rounded-md"
          v-model="form.password"
          required
          placeholder="parola"
        />
      </div>
      <!-- Submit -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full">
        Autentificare
      </button>
    </form>

    <!-- Sign Up -->
    <div class="mt-4">
      Nu ai deja cont?
      <router-link to="/auth/register" class="text-blue-600 hover:text-blue-400"
        >Crează cont.</router-link
      >
    </div>
  </div>
</template>