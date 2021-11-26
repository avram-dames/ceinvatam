<script setup>
import { ref } from 'vue'

const showMenu = ref(false)

let toggleNavbar = function(){
    this.showMenu = !this.showMenu;
}
</script>

<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-4 border-solid">
    <div class="container flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="text-xl font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase text-gray-600" href="#pablo">
          Logo
        </a>

        <button class="text-gray-600 cursor-pointer leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
      
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-lg uppercase leading-snug text-gray-600 hover:opacity-75" href="#pablo">
              <span class="ml-2">Events</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-lg uppercase leading-snug text-gray-600 hover:opacity-75" href="#pablo">
                <span class="ml-2">Providers</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="px-3 py-2 flex items-center text-lg uppercase leading-snug text-gray-600 hover:opacity-75" href="#pablo">
                <span class="ml-2">Login</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

