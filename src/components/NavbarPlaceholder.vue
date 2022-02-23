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
          to="/"
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
      </div>
    </div>
  </nav>
</template>

