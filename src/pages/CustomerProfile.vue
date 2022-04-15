<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import AlertDeleteAccountModal from "../components/AlertDeleteAccountModal.vue";
import DownloadIcon from "../components/icons/Download.vue";

const router = useRouter();
const store = useStore();
const updateStatus = ref("");

const alertDeleteAccountModalIsOpen = ref(false);

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
    updateStatus.value = "error";
  }
  updateStatus.value = "success";

  updateReviewsUserData(user.id);
}

async function downloadReviewsAsCsv(table) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("user_id", store.state.user.id)
    .csv();
  if (error) throw error;

  const link = window.document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(data)
  );
  link.setAttribute("download", "data.csv");
  link.click();
}

async function downloadPersonalDataAsCsv(table) {
  const user = supabase.auth.user();
  const header = "user_id,email,email_confirmed_at,user_metadata\n";
  const data = [
    user.id,
    user.email,
    user.email_confirmed_at,
    JSON.stringify(user.user_metadata),
  ];
  const link = window.document.createElement("a");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8,%EF%BB%BF" +
      encodeURI(header + data.join(",") + "\n")
  );
  link.setAttribute("download", "data.csv");
  link.click();
}

async function deleteAccount() {
  //to be implemented
  alertDeleteAccountModalIsOpen.value = false
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
        <div class="px-2 text-sm text-gray-400">Schimbarea adresei de email, necesită confirmare de la noua adresă de email.</div>
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
    <p class="mt-4">
      Conform politici Europene de protecție a datelor cu caracter 
      personal, aveți dreptul de a vă descărca datele dumneavoastră.
      Puteți citi mai multe despre drepturile dumneavoastră cu legătura
      la protecția datelor, <router-link :to="{name: 'ConfPolicy'}" class="text-blue-600 hover:text-blue-400">aici.</router-link>
      <ul class="mt-4">
      <li class="text-green-500 flex items-center px-2 cursor-pointer" @click="downloadPersonalDataAsCsv()"><DownloadIcon class="h-4 w-4 mr-1"></DownloadIcon>Descarca date personale</li>
      <li class="text-green-500 flex items-center px-2 cursor-pointer" @click="downloadReviewsAsCsv('class_reviews')"><DownloadIcon class="h-4 w-4 mr-1"></DownloadIcon>Descarca recenzii cursuri</li>
      <li class="text-green-500 flex items-center px-2 cursor-pointer" @click="downloadReviewsAsCsv('partner_reviews')"><DownloadIcon class="h-4 w-4 mr-1"></DownloadIcon>Descarca recenzii companii</li>
      </ul>
    </p>

    <h2 class="mt-12">Șterge cont</h2>
    <p class="mt-4">
      În cazul în care doriți să vă ștergeți contul, puteți accesa linkul următor. Acest proces v-a șterge 
      datele dumneavoastră din baza noastră de date în mod irevocabil. În cazul în care doriți să vă salvați 
      datele personale înainte de a vă șterge contul, vedeți secținea "Date personale" de mai sus.
    </p>
    <button class="text-white bg-red-500 w-full py-2 rounded-md text-center mt-4" @click="alertDeleteAccountModalIsOpen = true">Șterge Cont</button>
  </div>
  <!-- Black overlay in order to make the modal pop -->
  <div
      v-if="alertDeleteAccountModalIsOpen"
      class="bg-black z-10 opacity-80 w-full h-full fixed top-0 left-0"
    >
  </div>
  <AlertDeleteAccountModal class="z-50" :isOpen="alertDeleteAccountModalIsOpen" @close-modal="alertDeleteAccountModalIsOpen = false" @delete-account="deleteAccount"></AlertDeleteAccountModal>
</template>