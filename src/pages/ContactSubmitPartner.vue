<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const form = ref({
  name: "",
  city: "",
  message: ""
});

async function submitPartner() {
  const {data, error} = await supabase
    .from('contact_submit_partners')
    .insert([form.value])

  if (error) throw error

  router.push({name: 'ContactFormConfirmation'})
}

</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 py-12 m-auto max-w-xl text-gray-600">
    <h2 class="text-4xl font-bold text-black text-center">Adauga Companie</h2>

    <form @submit.prevent="submitPartner()">
      <div class="flex flex-col space-y-2 mt-8">
        <!-- Name Input -->
        <label for="name">Numele Companiei</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="form.name"
          class="p-2 border rounded-md"
          required
          placeholder="ex. Beauty Academy"
        />
        <!-- Email Input -->
        <label for="city">Oras</label>
        <input
          type="text"
          name="city"
          id="city"
          v-model="form.city"
          class="p-2 border rounded-md"
          required
          placeholder="ex. Bucuresti"
        />
        <!-- Message Input -->
        <label for="message">Mesaj</label>
        <textarea
          name="message"
          id="message"
          class="w-full border-solid border px-2 py-1 mt-4 text-lg rounded-md"
          v-model="form.message"
          placeholder="Detalii despre companie ..."
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