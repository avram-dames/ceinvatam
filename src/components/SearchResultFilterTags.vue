<script setup>
</script>

<template>
  <div class="flex space-x-1 overflow-x-auto hide-scroll-bar">
    <div class="flex flex-shrink-0 items-center space-x-1 bg-gray-200 rounded-2xl px-4 py-1">
      <span>Nume</span>
    </div>
    <div class="flex space-x-1 flex-shrink-0 ">
      <div
        class="flex items-center space-x-1 bg-green-200 rounded-2xl px-4 py-1"
      >
        <span>Nota</span
        ><i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </i>
      </div>

      <div
        class="flex flex-shrink-0  items-center space-x-1 bg-gray-200 rounded-2xl px-4 py-1"
      >
        <span>Durată</span>
      </div>

      <div
        class="
        flex-shrink-0 
          flex
          items-center
          space-x-1
          bg-gray-200
          rounded-2xl
          px-4
          py-1
        "
      >
        <span>Număr Evaluări</span>
      </div>
    </div>
  </div>

    <!-- Filters -->
  <div class="flex space-x-1 mt-2">
    <div class="flex items-center space-x-1 bg-blue-300 rounded-2xl px-4 py-1">
      <span>Doar Cursuri</span
      ><i>
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </i>
    </div>

    <div class="flex items-center space-x-1 bg-gray-200 rounded-2xl px-4 py-1">
      <span>Offline</span>
    </div>
  </div>
</template>

<style>

.hide-scroll-bar::-webkit-scrollbar {
    display: none;
}

</style>
