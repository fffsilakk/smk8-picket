<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post(
      "https://picket.ocph23.tech/api/auth/login",
      {
        username: username.value,
        password: password.value,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const auth = response.data;
    localStorage.setItem("authToken", JSON.stringify(auth));
    axios.defaults.baseURL = Helper.urlApi;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = auth
      ? "Bearer " + auth.token
      : "";

    router.push("/");
  } catch (error) {
    errorMessage.value = "Login failed. Please check your credentials.";
    console.error(error);
  }
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="login"
      class="max-w-sm w-full bg-white p-6 rounded-lg shadow-md"
    >
      <div class="flex justify-center mb-6">
        <img src="/public/smk.png" class="h-28 w-auto" alt="SMK Logo" />
      </div>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Username</label
        >
        <input
          type="text"
          v-model="username"
          id="username"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="username"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="password"
          required
        />
      </div>
      <div class="flex items-center mb-6">
        <input
          id="remember"
          type="checkbox"
          class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label for="remember" class="ml-2 block text-sm text-gray-900"
          >Remember me</label
        >
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Login
      </button>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<style scoped>
/* Tambahkan gaya khusus jika perlu */
</style>
