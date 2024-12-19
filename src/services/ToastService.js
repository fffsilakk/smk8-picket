// src/services/ToastService.js
import { reactive } from 'vue';

export const ToastService = reactive({
   toasts: [],
  addToast(message, type = 'info', duration = 3000) {
    const id = Date.now();
    this.toasts.push({ id, message, type, duration });

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  },
  removeToast(id) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  },
});
