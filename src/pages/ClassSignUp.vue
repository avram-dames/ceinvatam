<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

import ArrowBack from "../components/icons/ArrowBack.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const classDetails = ref({ name: "", partners: { name: "" } });
const form = ref({
  email: store.getters.userEmail,
  firstName: store.getters.userFirstName,
  lastName: store.getters.userLastName,
  phoneNumber: store.getters.phoneNumber,
});

async function getClassDetails() {
  const { data, error } = await supabase
    .from("classes")
    .select("name, partners(name)")
    .eq("id", route.params.id)
    .single();

  if (error) throw error;

  classDetails.value = data;
}

async function createLead() {
  const { data, error } = await supabase.from("leads").insert([
    {
      email: form.value.email,
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      phone: form.value.phoneNumber,
      class_id: route.params.id
    },
  ]);

  if (error) throw error;

  router.push({name: 'ClassSignUpConfirmation'})
  // confirmation email
}

getClassDetails();
</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 py-4 m-auto max-w-xl text-gray-600">
    <h1 class="text-3xl font-bold text-black">Sunt interesat de acest curs!</h1>
    <p class="py-2 h-20 text-clip overflow-hidden">
      <span class="text-md font-bold">{{ classDetails.name }}</span> oferit de
      <span>{{ classDetails.partners.name }}</span>
    </p>

    <p class="text-2xl text-black mb-6">
      Lasă-ne datele tale și te vom contacta cu o ofertă.
    </p>

    <form @submit.prevent="createLead()">
      <div class="flex flex-col space-y-3">
        <!-- Name Input -->
        <div class="flex space-x-2">
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="firstName">Prenume</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="form.firstName"
              class="p-2 border rounded-md"
              required
              placeholder="Prenume"
            />
          </div>
          <div class="flex flex-col min-w-0 space-y-1">
            <label for="lastName">Nume</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              v-model="form.lastName"
              class="p-2 border rounded-md"
              required
              placeholder="Nume"
            />
          </div>
        </div>
        <!-- Email Input -->
        <div class="flex flex-col space-y-1">
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
        </div>
        <!-- Phone Number Input -->
        <div class="flex flex-col space-y-1">
        <label for="phone">Număr de telefon</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          v-model="form.phoneNumber"
          class="p-2 border rounded-md"
          required
          placeholder="07***"
        />
        </div>
        <!-- Send -->
        <span></span>
        <button
          class="
            p-2
            bg-blue-600
            text-white
            rounded-md
            mt-8
            w-full
            lg:w-40
            self-end
          "
        >
          Trimite
        </button>
        <button 
        @click="$router.go(-1)"
        class="
            p-2
            bg-gray-400
            text-white
            rounded-md
            mt-8
            w-full
            lg:w-40
            self-end
            flex
            space-x-1
            justify-center
          ">
          <ArrowBack></ArrowBack>
          <span>Înapoi</span>
        </button>
      </div>
    </form>
  </div>
</template>