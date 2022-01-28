<script setup>
import { ref, useSlots, provide } from "vue";

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTitle = ref(tabTitles.value[0]);

provide("selectedTitle", selectedTitle);
</script>

<template>
  <div class="divide-y divide-solid">
    <ul class="flex overflow-x-auto hide-scroll-bar">
      <li
        class="px-4 py-2 cursor-pointer rounded-t-md"
        :class="{'bg-blue-200' : title == selectedTitle}"
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>