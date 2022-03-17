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
});
const emits = defineEmits(["close-modal", "delete-account"]);
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
                Ștergere Cont
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Sunteți sigur că doriți să vă ștergeți contul? Aceasă acțiune este irevocabilă. Toate datele dumneavoastră vor fi șterse, nemaiputând fi recuperate.
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
                    text-gray-900
                    bg-gray-100
                    border border-transparent
                    rounded-md
                    hover:bg-gray-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-gray-500
                  "
                  @click="$emit('close-modal')"
                >
                  Înapoi
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
                    text-red-900
                    bg-red-200
                    border border-transparent
                    rounded-md
                    hover:bg-red-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-red-500
                  "
                  @click="$emit('delete-account')"
                >
                  Șterge Cont!
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
