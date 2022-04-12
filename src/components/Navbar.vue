<script setup>
import { computed, ref } from "vue";
import supabase from "../utils/supabase";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const showMenu = ref(false);
const userIsAuthenticated = computed(() => store.getters.userIsAuthenticated);

let toggleNavbar = function () {
  showMenu.value = !showMenu.value;
};

async function login() {
  router.push({ name: "SignIn" });
  showMenu.value = false;
}

async function logout() {
  let { error } = await supabase.auth.signOut();
  router.push({ name: "Home" });
}
</script>

<template>
  <nav
    class="
      relative
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-4
      border-solid
    "
  >
    <div class="container flex flex-wrap items-center justify-between">
      <div
        class="
          w-full
          relative
          flex
          justify-between
          lg:w-auto
          px-4
          lg:static lg:block lg:justify-start
        "
      >
        <router-link
          :to="{name: 'Home'}"
          class="
            text-xl
            font-bold
            leading-relaxed
            inline-block
            py-2
            whitespace-nowrap
            uppercase
            text-gray-600
          "
        >
          Logo
        </router-link>

        <button
          class="
            text-gray-600
            cursor-pointer
            leading-none
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
          v-on:click="toggleNavbar()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
              href="#pablo"
            >
              <span class="ml-2">Events</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
              href="#pablo"
            >
              <span class="ml-2">Providers</span>
            </a>
          </li>
          <li v-if="store.getters.userIsAuthenticated" class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
              href="/myreviews"
            >
              <span class="ml-2">Recenziile Mele</span>
            </a>
          </li>
          <li v-if="store.getters.userIsAuthenticated" class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
              href="/profile"
            >
              <span class="ml-2">Cont</span>
            </a>
          </li>

          <li class="nav-item" v-if="!userIsAuthenticated">
            <button
              @click="login"
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
            >
              <span class="ml-2">Autentificare</span>
            </button>
          </li>

          <li class="nav-item" v-else>
            <button
              @click="logout"
              class="
                px-3
                py-2
                flex
                items-center
                text-lg
                uppercase
                leading-snug
                text-gray-600
                hover:opacity-75
              "
            >
              <span class="ml-2">Ieșire Cont</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

