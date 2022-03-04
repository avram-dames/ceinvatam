<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

const router = useRouter();
const store = useStore();
const updateStatus = ref('');

const form = ref({
  email: store.state.user?.email,
  firstname: store.getters.userFirstName,
  lastname: store.getters.userLastName,
  fullname: store.getters.userFullName,
  avatar: store.getters.userAvatar,
});

async function updateReviewsUserData(userId) {
  const { data, error } = await supabase
    .from("class_reviews")
    .update({ first_name: form.value.firstname, avatar_url: form.value.avatar })
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}

async function updateProfile() {
  form.value.fullname = form.value.firstname + " " + form.value.lastname;

  const { user, error } = await supabase.auth.update({
    email: form.value.email,
    data: {
      user_first_name: form.value.firstname,
      user_last_name: form.value.lastname,
      user_full_name: form.value.fullname,
      user_avatar: form.value.avatar,
    },
  });

  if (error) {
    throw error;
    updateStatus.value = 'error';  
  }
  updateStatus.value = 'success';

  updateReviewsUserData(user.id);
}
</script>

<template>
  <Navbar class=""></Navbar>
  <div class="px-4 py-12 m-auto max-w-md text-gray-600">
    <div class="flex flex-col items-center space-y-4">
      <img
        :src="form.avatar"
        alt="User Avatar"
        class="h-12 w-12 rounded-2xl object-cover"
      />
      <h2 class="text-3xl font-medium text-gray-800">
        {{ form.fullname }}
      </h2>
    </div>

    <!-- Email Login -->
    <form @submit.prevent="updateProfile()">
      <!-- Name Input -->
      <div class="flex flex-col space-y-2 mt-12">
        <label for="lastname">Nume</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          v-model="form.lastname"
          class="p-2 border rounded-md"
          required
          placeholder="Nume"
        />
        <label for="">Prenume</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          v-model="form.firstname"
          class="p-2 border rounded-md"
          required
          placeholder="Prenume"
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
          placeholder="name@email.com"
        />
      </div>
      <!-- Sign In -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full">
        Actualizează date
      </button>
      <div v-if="updateStatus === 'success'" class="text-green-600 mt-2 flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div class="ml-2">
          Datele au fost actualizate cu success.
        </div>
      </div>
      <div v-if="updateStatus === 'error'" class="text-red-500 mt-2 flex">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="#ef4444"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>

        <div class="ml-2">
          Datele nu au putut fi actualizate. Încercați mai târziu!
        </div>
      </div>
    </form>

    <h2 class="mt-12">Date personale</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla
      aperiam iure doloribus amet facere, veritatis error nemo possimus deleniti
      fugit maxime, id nam commodi? Expedita odio iusto sunt tempore.
      <span class="text-green-400"
        ><a href="">Descarca date personale.</a></span
      >
    </p>

    <h2 class="mt-12">Șterge cont</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla
      aperiam iure doloribus amet facere, veritatis error nemo possimus deleniti
      fugit maxime, id nam commodi? Expedita odio iusto sunt tempore.
      <span class="text-red-400"><a href="">Sterge Cont.</a></span>
    </p>
  </div>
</template>