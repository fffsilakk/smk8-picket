<!-- Toast.vue -->
<template>
  <div v-if="isVisible" :class="type" @click="closeToast">
    <div id="alert-additional-content-3" :class="bodyColorClass" role="alert">
      <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">This is a success alert</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        {{ message }}
      </div>
      <div class="flex justify-end">
        <button type="button" :class="buttonColorClass" data-dismiss-target="#alert-additional-content-3"
          aria-label="Close">
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'info', // Default toast type
    },
    duration: {
      type: Number,
      default: 3000, // Default duration in ms
    },
  },
  data() {
    return {
      isVisible: true,
      buttonColorClass: '',
    };
  },
  mounted() {

    this.bodyColorClass = "p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800";
    this.buttonColorClass="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"


    if (this.type == 'error') {
      this.bodyColorClass = "p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800";
      this.buttonColorClass = "text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
    }
    
    if (this.type == 'success') {
      this.bodyColorClass = "p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800";
      this.buttonColorClass = "text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
    }

    setTimeout(this.closeToast, this.duration);
  },
  methods: {
    closeToast() {
      this.isVisible = false;
    },

  }
};
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

.toast.info {
  background-color: #3498db;
}

.toast.success {
  background-color: #2ecc71;
}

.toast.error {
  background-color: #e74c3c;
}

.toast.warning {
  background-color: #f39c12;
}
</style>