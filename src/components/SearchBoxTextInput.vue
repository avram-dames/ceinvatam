<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

const router = useRouter();
const root = ref(null);
const userInput = ref("");
const suggestions = ref([]);
const showSuggestionsDropdown = ref(false);
const arrowCounter = ref(-1);

// bind parent's searchText to userInput using update:searchText event
const props = defineProps({
  searchText: String,
});
const emits = defineEmits(["update:searchText"]);

// make string lowercase and remove accents
function udfNormalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// match user input with items in the suggestion list
function updateSuggestionsOnUserInput() {
  suggestions.value = store.state.searchSuggestions.filter(
    (item) =>
      udfNormalize(item.name).indexOf(udfNormalize(userInput.value)) > -1
  );
}

// listens for changes in user input and runs logic
// ~~ not the cleanest code ever, should be refactored ~~
watch(userInput, (val, preVal) => {
  emits("update:searchText", val);
  if (val.length > 2) {
    updateSuggestionsOnUserInput();
  } else {
    suggestions.value = [];
    arrowCounter.value = 0;
  }
  
  const phrases = suggestions.value.filter((item) => item.rank === 1)

  if (suggestions.value.length === 0) {
    showSuggestionsDropdown.value = false;
  } else if (
    phrases.length === 1 &&
    val === phrases[0].name
  ) {
    showSuggestionsDropdown.value = false;
  } else {
    showSuggestionsDropdown.value = true;
  }
});

// interact with the dropdown list
function onArrowDown() {
  if (arrowCounter.value < suggestions.value.length - 1) {
    arrowCounter.value = arrowCounter.value + 1;
  }
}

function onArrowUp() {
  if (arrowCounter.value > 0) {
    arrowCounter.value = arrowCounter.value - 1;
  }
}

function onEnter(event) {
  if (arrowCounter.value === -1) {
    // unfocus element if the user presses enter twice if the option is already selected
    document.activeElement.blur()
  } else if (suggestions.value[arrowCounter.value].entity === "class") {
    router.push("class");
  } else if (suggestions.value[arrowCounter.value].entity === "partner") {
    router.push("partner");
  } else {
    userInput.value = suggestions.value[arrowCounter.value].name;
    arrowCounter.value = -1;
    showSuggestionsDropdown.value = false;
  }
}

function onClick(item) {
  userInput.value = item.name;
  showSuggestionsDropdown.value = false;
  if (item.entity === "partner") {
    router.push("partner");
  } else if (item.entity === "class") {
    router.push("class");
  }
}

// close the dropdown when the user clicks outside of it
function handleClickOutside(event) {
  if (!root.value.contains(event.target)) {
    arrowCounter.value = -1;
    showSuggestionsDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="root">
    <!-- User Input -->
    <input
      type="text"
      placeholder="Ce dorești să înveți?"
      v-model="userInput"
      @keydown.enter.prevent
      @keydown.enter="onEnter"
      @keydown.down.prevent
      @keydown.up.prevent
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      class="relative h-12 w-full m-0 px-4 py-2 border border-gray-300 rounded-md"
    />
    <!-- Dropdown Suggestions List -->
    <ul
      class="
        absolute
        mt-1
        z-50
        bg-white
        border
        border-gray-200
        w-full-w-margins
        lg:w-1/2
      "
      v-show="showSuggestionsDropdown"
    >
      <li
        class="autocomplete-result list-none text-left px-4 py-2 cursor-pointer"
        @click="onClick(item)"
        v-for="(item, i) in suggestions"
        :key="item.id"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <div class="flex">
          <!-- Class Icon -->
          <svg
            v-if="item.entity === 'class'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          <!-- Partner Icon -->
          <svg
            v-if="item.entity === 'partner'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <svg
            v-if="item.entity === 'phrase'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="{2}"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="pl-2">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.autocomplete-result.is-active {
  background-color: #bc7dfc;
  color: white;
}
</style>