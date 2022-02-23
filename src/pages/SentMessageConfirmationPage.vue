<script setup>
import NavbarPlaceholder from "../components/NavbarPlaceholder.vue";

import msgSent from "../assets/undraw_mail_sent_re_0ofv.svg";
</script>

<template>
  <NavbarPlaceholder class=""></NavbarPlaceholder>
  <div class="px-4 mt-12 flex flex-col items-center space-y-12">
    <p class="text-3xl font-medium">Mulțumim pentru mesaj!</p>

    <img :src="msgSent" alt="Mail Sent Illustration" class="h-40" />

    <div
      class="flex flex-col lg:flex-row space-y-2 lg:space-x-4 lg:space-y-0 w-full lg:w-auto"
    >
      <router-link to="/contact">
        <button
          class="
            px-4
            py-2
            bg-gray-400
            rounded-md
            text-white text-lg
            w-full
            md:w-40
          "
        >
          Contact
        </button>
      </router-link>

      <router-link to="/">
        <button
          class="
            px-4
            py-2
            bg-purple-400
            rounded-md
            text-white text-lg
            w-full
            md:w-40
          "
        >
          Acasă
        </button>
      </router-link>
    </div>
  </div>
</template>