<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import supabase from "../utils/supabase";

import Navbar from "../components/Navbar.vue";
import AlertError from "../components/AlertError.vue";
import ArrowBack from "../components/icons/ArrowBack.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const phoneNumberIsInvalidAlert = ref();
const agreeCheckboxAlert = ref();
const agreeCheckbox = ref(false);
const classDetails = ref({ name: "", partners: { id: null, name: "" } });
const form = ref({
  email: store.getters.userEmail,
  firstName: store.getters.userFirstName,
  lastName: store.getters.userLastName,
  phoneNumber: store.getters.phoneNumber,
});

function validatePhoneNumber(input_str) {
  let re = /^[\+]?[(]?[0-9]{3,4}[)]?[-\s\.]?[0-9]{6,9}$/im;
  return re.test(input_str.replace(/\s/g, ""));
}

async function getClassDetails() {
  const { data, error } = await supabase
    .from("classes")
    .select("name, partners(id, name)")
    .eq("id", route.params.id)
    .single();

  if (error) throw error;

  classDetails.value = data;
}

async function createLead() {
  if (!agreeCheckbox.value) {
    agreeCheckboxAlert.value = 'Este necesar să fi de acord cu termenii de mai sus.'
    return 0;
  } else {
    agreeCheckboxAlert.value = ''
  }

  if (!validatePhoneNumber(form.value.phoneNumber)) {
    phoneNumberIsInvalidAlert.value = "Numărul de telefon trebuie să fie valid. (ex. 0744 444 444)"
    return 0
  } else {
    phoneNumberIsInvalidAlert.value = ""
  }

  const { data, error } = await supabase.from("leads").insert([
    {
      email: form.value.email,
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      phone: form.value.phoneNumber,
      class_id: route.params.id,
    },
  ]);

  if (error) throw error;

  router.push({ name: "ClassSignUpConfirmation" });
  // confirmation email
}

getClassDetails();
</script>

<template>
  <Navbar></Navbar>
  <div class="px-4 py-4 m-auto max-w-xl text-gray-600">
    <h1 class="text-3xl font-bold text-black mb-6">
      Lasă-ne datele tale și te vom contacta cu o ofertă.
    </h1>

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
          <AlertError :message="phoneNumberIsInvalidAlert"></AlertError>
        </div>
        <!-- Send -->
        <div class="py-2 mt-4 mb-4 flex">
          <div class="pr-2">
            <input type="checkbox" class="h-6 w-6" v-model="agreeCheckbox" />
          </div>
          <div>
            Sunt de acord să fiu contactat de echipa ceînvățăm.ro pentru a
            primii mai multe detalii despre cursul de
            <span class="font-bold">{{ classDetails.name }}</span>
            oferit de
            <span class="font-bold">{{ classDetails.partners.name }}</span
            >.
          </div>
        </div>
        <AlertError :message="agreeCheckboxAlert"></AlertError>
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
          "
        >
          <ArrowBack></ArrowBack>
          <span>Înapoi</span>
        </button>
      </div>
    </form>
  </div>
</template>