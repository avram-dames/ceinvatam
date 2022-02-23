<script setup>
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const form = ref({
  email: "",
  name: "",
  message: "",
});

async function sendMessage() {
  const {data, error} = await supabase
    .from('contact')
    .insert([form.value])

  if (error) throw error

  router.push({name: 'SentMessageConfirmationPage'})
}

</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 py-12 m-auto max-w-xl text-gray-600">
    <h2 class="text-4xl font-bold text-black text-center">Date de contact</h2>

    <div
      class="
        mt-8
        flex flex-col
        space-y-4
        lg:space-y-0 lg:flex-row
        justify-between
      "
    >
      <div>
        <h2 class="text-2xl font-medium text-black">Adresă</h2>
        <p class="text-gray-600">Str. Strada, Nr. 12, Timișoara</p>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-black">Email</h2>
        <p class="text-gray-600">office@ceinvatam.ro</p>
      </div>
      <div>
        <h2 class="text-2xl font-medium text-black">Telefon</h2>
        <p class="text-gray-600">0222 222 222</p>
      </div>
    </div>

    <h2 class="text-2xl font-medium mt-8 mb-4 text-black">
      Formular de contact
    </h2>

    <form @submit.prevent="sendMessage()">
      <div class="flex flex-col space-y-2">
        <!-- Name Input -->
        <label for="name">Nume</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="form.name"
          class="p-2 border rounded-md"
          required
          placeholder="Numele tău"
        />
        <!-- Email Input -->
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          class="p-2 border rounded-md"
          required
          placeholder="nume@email.com"
        />
        <!-- Message Input -->
        <label for="message">Mesaj</label>
        <textarea
          name="message"
          id="message"
          class="w-full border-solid border px-2 py-1 mt-4 text-lg rounded-md"
          v-model="form.message"
          required
          placeholder="Mesajul tău"
          rows="10"
        />
        <!-- Send -->
        <button
          class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full lg:w-40 self-end"
        >
          Trimite
        </button>
      </div>
    </form>
  </div>
</template>