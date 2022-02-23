<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";

const router = useRouter();
const props = defineProps(['query'])

const form = ref({
  email: props.query,
});

async function submitPasswordResetRequest() {
  let { data, error } = await supabase.auth.api.resetPasswordForEmail(
    form.value.email
  );

  if (error) { alert(error.message); throw error; }

  router.push({ name: "SignInPasswordResetInstructions" });
}
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-4xl font-bold text-gray-800">Resetează parolă</h2>

    <form @submit.prevent="submitPasswordResetRequest()">
      <!-- Email Input -->
      <div class="flex flex-col space-y-2 mt-12">
        <label for="email">Adresa de email pentru care doriți să resetați parola</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          class="p-2 border rounded-md"
          required
          placeholder="name@email.com"
        />
      </div>
      <!-- Sign In -->
      <button class="p-2 bg-red-500 text-white rounded-md mt-8 w-full">
        Resetează Parola
      </button>
    </form>
  </div>
</template>