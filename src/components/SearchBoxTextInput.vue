<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import store from "../store";

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


function updateSuggestionsOnUserInput() {
  suggestions.value = store.state.searchSuggestions.filter(
    (item) =>
      item.name.toLowerCase().indexOf(userInput.value.toLowerCase()) > -1
  );
}

watch(userInput, (val, preVal) =>  {
  emits('update:searchText', val)
  if (suggestions.value.length === 1 && suggestions.value[0] === val) {

  } else if (val.length > 1) {
    updateSuggestionsOnUserInput();
    showSuggestionsDropdown.value = true;
  } else {
    suggestions.value = [];
    showSuggestionsDropdown.value = false;
    arrowCounter.value = 0;
  }
})

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

function onEnter() {
  userInput.value = suggestions.value[arrowCounter.value].name;
  arrowCounter.value = -1;
  showSuggestionsDropdown.value = false;
}

function onClick(item) {
  userInput.value = item.name;
  showSuggestionsDropdown.value = false;
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
      placeholder="ce dorești să înveți?"
      v-model="userInput"
      @keydown.down.prevent
      @keydown.up.prevent
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      class="w-full px-4 py-2 border border-gray-400 rounded-md h-12 autocomplete"
    />
    <!-- Dropdown Suggestions List -->
    <ul class="autocomplete-results" v-show="showSuggestionsDropdown">
      <li
        class="autocomplete-result"
        @click="onClick(item)"
        v-for="(item, i) in suggestions"
        :key="item.id"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  position: absolute;
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  width: 100%;
  z-index: 99;
  background-color: white;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>