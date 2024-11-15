<template>
  <form @submit.prevent="addData" class="max-w-sm mx-auto pt-10">
    <div class="mt-12">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nama
      </label>
      <input
        v-model="formData.name"
        type="text"
        id="name"
        class="rounded rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name"
      />
    </div>

    <div class="m-8 max-w-sm mx-auto">
      <label
        for="initial"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Jurusan
      </label>
      <input
        v-model="formData.initial"
        id="initial"
        type="text"
        placeholder="jurusan"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <div
      class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <label for="description" class="sr-only">Your description</label>
        <textarea
          v-model="formData.description"
          id="description"
          rows="4"
          class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
    </div>

    <button
      type="submit"
      class="flex justify-center items-center m-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Tambah
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      formData: {
        name: "",
        initial: "",
        description: "",
      },
    };
  },

  methods: {
    async addData() {
      try {
        const response = await axios.post(
          "https://picket.ocph23.tech/api/department",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmZmRiMDY2LWY1MmQtNGE3Ny05YTgxLWVjNzk1NjFhOTFjMCIsIm5hbWUiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJzdWIiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJlbWFpbCI6ImFkbWluQHBpY2tldC5vY3BoMjMudGVjaCIsImp0aSI6IjdlOGY2MzhkLTk3MDktNDc4NC04Yjk1LWQ2OWVmN2VkMWQ1NSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMTQ2MzY0NywiZXhwIjoxNzMyMDY4NDQ3LCJpYXQiOjE3MzE0NjM2NDcsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9.2V9vfNOnw03E1zSH2shzpsPkjP44ELPHMQfyAP50EmMcSEkFP3Del20Xsn2qbBD7XA0a-t2_axQdy5SN5vrJIA"}`, // Ganti dengan token yang sesuai
            },
          }
        );

        console.log("Data added:", response.data);
        this.resetForm();
        this.$router.push({ path: "/Jurusan" });
      } catch (error) {
        console.error("Error adding data:", error);
        if (error.response) {
          console.log("Error data:", error.response.data);
        }
      }
    },
    resetForm() {
      this.formData = {
        name: "",
        initial: "",
        description: "",
      };
    },
  },
};
</script>
