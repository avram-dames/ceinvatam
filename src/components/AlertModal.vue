<script setup>
import { useRouter } from 'vue-router';

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
});
const emits = defineEmits(["close-modal"]);
const router = useRouter();

function prevPage() {
  router.go(-1);
}

function goHome() {
  router.push({name: 'Home'})
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ message }}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    border border-transparent
                    rounded-md
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500
                  "
                  @click="prevPage()"
                >
                  Pagina precedentă
                </button>
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    ml-2
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-purple-900
                    bg-purple-100
                    border border-transparent
                    rounded-md
                    hover:bg-purple-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-purple-500
                  "
                  @click="goHome()"
                >
                  Acasă
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
