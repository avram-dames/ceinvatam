<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";
import AlertError from "../components/AlertError.vue";

import fbLogoUrl from "../assets/fb_logo.png";
import gLogoUrl from "../assets/g_logo.png";
import ArrowBack from "../components/icons/ArrowBack.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref();
const passwordIncludesSpaces = ref(false);
const passwordIsTooShort = ref(false);

function validatePassword() {
  passwordIncludesSpaces.value = password.value.includes(" ") ? true : false;
  passwordIsTooShort.value = password.value.length < 6 ? true : false;
  return !passwordIncludesSpaces.value && !passwordIsTooShort.value;
}

watch(password, validatePassword);

const socialProviders = [
  { name: "Google", iconPath: gLogoUrl },
  { name: "Facebook", iconPath: fbLogoUrl },
];

async function registerEmail() {
  if (validatePassword) {
    let { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push({ name: "SignUpConfirmed" });
  }
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
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-4xl font-bold text-gray-800">Crează un cont nou</h2>
    <p class="py-2 text-gray-400">
      Crează un cont pentru a putea lăsa recenzii la cursurile urmate și multe
      alte beneficii.
    </p>
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
          v-model="email"
          class="p-2 border rounded-md"
          required
          placeholder="name@email.com"
        />
        <!-- Password Input -->
        <label for="password">Crează o parolă </label>
        <input
          :type="showPassword ? 'text' : 'password'"
          name="password"
          id="password"
          class="p-2 border rounded-md"
          v-model="password"
          required
          placeholder="Parolă nouă"
        />
        <div class="text-gray-400 text-sm">
          <input
            type="checkbox"
            name="show-password"
            id="show-password"
            v-model="showPassword"
          />
          <label for="show-password" class="ml-2">Arată parola</label>
        </div>
      </div>
      <ul>
        <li v-if="passwordIsTooShort">
          <AlertError
            message="Parola trebuie să conțină minim 6 caractere"
          ></AlertError>
        </li>
        <li v-if="passwordIncludesSpaces">
          <AlertError
            message="Spațiile goale nu sunt admise în parolă"
          ></AlertError>
        </li>
      </ul>
      <!-- Sign In -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-4 w-full">
        Crează cont
      </button>
       <div
        @click="$router.go(-1);"
        class="
          p-2
          bg-gray-400
          text-white
          rounded-md
          mt-2
          w-full
          flex
          items-center
          justify-center
        "
      >
        <ArrowBack></ArrowBack>
        <span class="ml-1">Înapoi</span>
      </div>
    </form>

    <!-- Sign Up -->
    <div class="mt-4">
      Am deja cont, vreau să mă
      <router-link to="/auth/login" class="text-blue-600 hover:text-blue-400"
        >autentific.</router-link
      >
    </div>
  </div>
</template>