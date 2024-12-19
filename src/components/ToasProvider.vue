<!-- Toast.vue -->
<template>
    <div v-for="toas in toastList" class="toast">
        <ToastView :message="toas.message" :type="toas.type" :duration="toas.duration"></ToastView>
    </div>
</template>

<script setup>
import { ToastService } from "../services/ToastService";
import ToastView from "./ToastView.vue";
import { computed } from "vue";

const toastList = computed(() => ToastService.toasts);

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