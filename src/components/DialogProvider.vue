<!-- Toast.vue -->
<template>
  <div
        v-if="isShow"
        class="fixed  inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <p>
            {{ message }}?
          </p>
          <div class="mt-4 flex gap-4 justify-end">
            <button
              @click="cancelCommand"
              class="px-4 py-2 bg-gray-400 text-white rounded"
            >
              {{cancelText}}
            </button>
            <button
            @click="okCommand"
            class="px-4 py-2 bg-red-500 text-white rounded"
            >
            {{okText}}
            </button>
          </div>
        </div>
      </div>
</template>

<script setup>
import { DialogService } from "../services/DialogService";
import { computed } from "vue";


const isShow = computed(() => DialogService.isShow);
const message= computed(()=>DialogService.message);

const cancelText= computed(()=> DialogService.cancelText);
const okText= computed(()=>DialogService.okText);

const cancelCommand=()=>{
    DialogService.cancelClick();
    DialogService.isShow=false;
  }
  const okCommand=()=>{
    DialogService.okClick();
    DialogService.isShow=false;
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