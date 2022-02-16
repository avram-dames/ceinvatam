<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

import fbLogoUrl from "../assets/fb_logo.png";
import gLogoUrl from "../assets/g_logo.png";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const socialProviders = [
  { name: "Google", iconPath: gLogoUrl },
  { name: "Facebook", iconPath: fbLogoUrl },
];

async function registerEmail() {
  let { user, error } = await supabase.auth.signUp({
    email: form.value.email,
    password: form.value.password
  });

  if (error) throw error;

  router.push({ name: "Home" });
}

async function loginWithSocial(provider) {
  const { user, session, error } = await supabase.auth.signIn({
    provider: provider,
  });

  if (error) throw error;

  router.push({ name: "Home" });
}
</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-3xl font-medium text-gray-800">Crează un cont nou</h2>

    <!-- Social Login -->
    <div class="mt-8 flex flex-col">
      <button
        v-for="provider in socialProviders"
        :key="provider"
        class="border rounded-md p-2 mb-2 flex space-x-2"
        @click="loginWithSocial(provider.name)"
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
    <form @submit.prevent="registerEmail()">
      <!-- Name Input -->
      <div class="flex flex-col space-y-2">
        <!-- Email Input -->
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
        <label for="password">Crează o parolă</label>
        <input
          type="password"
          name="password"
          id="password"
          class="p-2 border rounded-md"
          v-model="form.password"
          required
          placeholder="Parolă nouă"
        />
      </div>
      <!-- Sign In -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full">
        Crează cont
      </button>
    </form>

    <!-- Sign Up -->
    <div class="mt-4">
      Am deja cont, vreau să mă
      <router-link to="/signin" class="text-blue-600 hover:text-blue-400"
        >autentific.</router-link
      >
    </div>
  </div>
</template>