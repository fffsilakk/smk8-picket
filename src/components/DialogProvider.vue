<!-- Toast.vue -->
<template>
  <div v-if="isShow" class="fixed  inset-0 z-50  bg-opacity-50 flex justify-center items-center" 
  >
    <div :class="bodyColorClass" class="p-6 rounded-lg shadow-lg max-w-md">
      <p>
        {{ message }}?
      </p>
      <div class="mt-4 flex gap-4 justify-end">
        <button @click="cancelCommand" class="px-4 py-2 bg-gray-400 text-white rounded">
          {{ cancelText }}
        </button>
        <button @click="okCommand" :class="buttonColorClass" >
          {{ okText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DialogService } from "../services/DialogService";
import { computed, ref } from "vue";


const isShow = computed(() => DialogService.isShow);
const message = computed(() => DialogService.message);

const cancelText = computed(() => DialogService.cancelText);
const okText = computed(() => DialogService.okText);

const bodyColorClass = computed(() => {
  let bodyColor = "p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800";

  if (DialogService.type == 'danger') {
    bodyColor = "p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800";
  }

  if (DialogService.type == 'success') {
    bodyColor = "p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800";
  }
  if (DialogService.type == 'warning') {
    bodyColor = "p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800";
  }
  return bodyColor;
});

const buttonColorClass = computed(() => {
  let buttonColor = "text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800";

  if (DialogService.type == 'danger') {
    buttonColor = "text-red-800 bg-red=800 border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
  }

  if (DialogService.type == 'success') {
    buttonColor = "text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
  }

  if (DialogService.type == 'warning') {
    buttonColor = "text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-600 dark:border-yellow-600 dark:text-yellow-400 dark:hover:text-white dark:focus:ring-yellow-800"
  }

  return buttonColor;
});









const cancelCommand = () => {
  DialogService.cancelClick();
  DialogService.isShow = false;
}
const okCommand = () => {
  DialogService.okClick();
  DialogService.isShow = false;
}



</script>

<style scoped>
.toast {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  width: 400px;
  height: 200px;
  z-index: 9999999;
}
</style>