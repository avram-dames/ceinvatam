<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";

const router = useRouter();
const store = useStore();

const providers = computed(() => store.getters.userLinkedAccounts);
const userHasEmailAccount = computed(() => providers.value.includes("Email"));
const alerts = ref(store.state.alerts);
alerts.value.forEach((item) => alert(item.msg));
store.commit("deleteAlerts");

const form = ref({
  email: store.state.user?.email,
  old_password: null,
  new_password: null,
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
    alert(error.message);
    throw error;
  }
}

async function validateOldPassword() {
  let { user, error } = await supabase.auth.signIn({
    email: form.value.email,
    password: form.value.old_password,
  });

  return user ? true : false;
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

  if (error) throw error;

  if (user.user_metadata?.is_reviewer) {
    updateReviewsUserData(user.id);
  }

  alert("Update successful.");
}

async function updatePassword() {
  if (await validateOldPassword()) {
    const { user, error } = await supabase.auth.update({
      password: form.value.new_password,
    });

    if (error) throw error;

    alert("Update successful.");
  } else {
    alert("Old password is not correct!");
  }
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
    </form>

    <form v-if="userHasEmailAccount" @submit.prevent="updatePassword()">
      <!-- Name Input -->
      <div class="flex flex-col space-y-2 mt-12">
        <!-- Old Password Input -->
        <label for="old_password">Confirmă parola veche</label>
        <input
          type="old_password"
          name="old_password"
          id="old_password"
          class="p-2 border rounded-md"
          v-model="form.old_password"
          required
          placeholder="Parolă veche"
        />
        <!-- New Password Input -->
        <label for="new_password">Crează o parolă</label>
        <input
          type="new_password"
          name="new_password"
          id="new_password"
          class="p-2 border rounded-md"
          v-model="form.new_password"
          required
          placeholder="Parolă nouă"
        />
      </div>
      <!-- Sign In -->
      <button class="p-2 bg-blue-600 text-white rounded-md mt-8 w-full">
        Schimbă parola
      </button>
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