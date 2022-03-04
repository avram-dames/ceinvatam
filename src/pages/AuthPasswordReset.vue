<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";
import AlertError from "../components/AlertError.vue";

const router = useRouter();
const store = useStore();
const email = computed(() => store.getters.userEmail);
const password = ref("");
const showPassword = ref();
const passwordIncludesSpaces = ref(false);
const passwordIsTooShort = ref(false);

function validatePassword() {
  // check for spaces
  passwordIncludesSpaces.value = password.value.includes(" ") ? true : false;
  // check for length
  passwordIsTooShort.value = password.value.length < 6 ? true : false;
  return !passwordIncludesSpaces.value && !passwordIsTooShort.value;
}

watch(password, validatePassword);

async function updateUserPassword() {
  if (validatePassword()) {
    const { user, error } = await supabase.auth.update({
      password: password.value,
    });

    if (error) throw error;

    router.push({ name: "Home" });
  }
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

        <label for="password">Parolă </label>
        <input
          :type="showPassword ? 'text' : 'password'"
          name="password"
          id="password"
          class="p-2 border rounded-md"
          v-model="password"
          required
          placeholder="Parola"
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
      </div>
      <!-- Submit -->
      <button class="p-2 mt-4 bg-blue-600 text-white rounded-md w-full">
        Schimbă Parola
      </button>
    </form>
  </div>
</template>