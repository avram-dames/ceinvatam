<script setup>
import { parseDate } from "../utils/parsers";
const props = defineProps([
  "partners",
  "classes",
  "text",
  "score",
  "created_at",
  "color",
  "status",
]);
const color = props.partners ? "yellow" : "purple";

const reviewStatusColor = {
  pending: "bg-yellow-100",
  process: "bg-purple-100",
  approved: "bg-green-100",
  rejected: "bg-red-100",
};

const reviewStatusTranslation = {
  pending: "În așteptare",
  process: "În curs de procesare",
  approved: "Aprobată",
  rejected: "Respinsă",
};
</script>

<template>
  <div class="w-full">
    <div class="flex pb-4 pt-1 justify-between mt-4">
      <div class="text-md font-semibold text-gray-800">
        {{ partners?.name || classes?.name }}
      </div>
      <div class="px-2 rounded-md text-white" :class="`bg-${color}-500`">
        {{ score }}
      </div>
    </div>

    <div class="text-gray-800">
      {{ text }}
    </div>
    <div class="flex justify-between mt-2">
      <div
        class="text-sm rounded-lg px-2 text-gray-500"
        :class="reviewStatusColor[status]"
      >
        <span>{{ reviewStatusTranslation[status] }}</span>
      </div>
      <div class="text-sm text-right text-gray-400">
        {{ parseDate(created_at) }}
      </div>
    </div>
  </div>
</template>