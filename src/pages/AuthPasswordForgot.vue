<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../utils/supabase";

import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";
import AlertModal from "../components/AlertModal.vue";
import AlertError from "../components/AlertError.vue";
import ArrowBack from "../components/icons/ArrowBack.vue";

const router = useRouter();
const props = defineProps(["query"]);
const resetPasswordFormAlertMessage = ref("");

const alertModal = ref({
  isOpen: false,
  title: "",
  message: "",
});

function openAlertModal(title, message) {
  alertModal.value.isOpen = true;
  alertModal.value.title = title;
  alertModal.value.message = message;
}

function returnToPrevPage() {
  router.go(-1);
}

const form = ref({
  email: props.query,
});

function handleError(error, message) {
  // alertMessages.value.push(message);
  // send error somewhere
  console.log(message);
  throw error;
}

async function submitPasswordResetRequest() {
  let { data, error } = await supabase.auth.api.resetPasswordForEmail(
    form.value.email
  );

  if (error) {
    if (error.status === 404) {
      resetPasswordFormAlertMessage.value = "Nu există user cu acest email";
    } else if (error.status === 429) {
      resetPasswordFormAlertMessage.value =
        "Trebuie să așteptați 60 de secunde pentru o nouă cerere.";
    } else {
      openAlertModal("Conexiune nereușită", "Ne pare rău dar");
    }
    handleError(error);
  }

  router.push({ name: "PasswordResetEmailSent" });
}
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <h2 class="text-4xl font-bold text-gray-800">Resetează parolă</h2>

    <form @submit.prevent="submitPasswordResetRequest()">
      <!-- Email Input -->
      <div class="flex flex-col space-y-2 mt-12">
        <label for="email"
          >Adresa de email pentru care doriți să resetați parola</label
        >
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

      <AlertError :message="resetPasswordFormAlertMessage"></AlertError>

      <!-- Sign In -->
      <button class="p-2 mt-4 bg-red-500 text-white rounded-md w-full">
        Resetează Parola
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
    <!-- Black overlay in order to make the modal pop -->
    <div
      v-if="alertModal.isOpen"
      class="bg-black z-10 opacity-80 w-full h-screen absolute top-0 left-0"
    ></div>
  </div>
  <AlertModal class="z-50" v-bind="alertModal"></AlertModal>
</template>