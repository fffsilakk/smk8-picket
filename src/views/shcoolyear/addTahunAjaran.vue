<template>
  <form @submit.prevent="addData" class="max-w-sm mx-auto pt-10">
    <!-- ID dihapus, ID akan otomatis di-generate oleh server -->

    <div class="mb-5">
      <label
        for="yearpicker"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Year</label
      >
      <input
        v-model="formData.year"
        id="yearpicker"
        type="number"
        min="1900"
        max="2100"
        step="1"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Masukan Tahun"
        required
      />
    </div>

    <div class="mb-5">
      <label
        for="active"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Active</label
      >
      <select
        v-model="formData.active"
        id="active"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
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
import { useRouter } from "vue-router"; // Import useRouter dari vue-router

export default {
  data() {
    return {
      formData: {
        year: null,
        active: true,
      },
    };
  },
  methods: {
    async addData() {
      try {
        const response = await axios.post(
          "https://picket.ocph23.tech/api/schoolyear",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiYWVlYzAyLWVkZjAtNGMyZS1hODMwLTRmZjFmYzgyNDllOSIsIm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImp0aSI6Ijg4ODU0ZjNjLTJlODAtNDI4NS1hOTVkLTI4YmU5MmU3YWM2NCIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMDcwOTk1NSwiZXhwIjoxNzMxMzE0NzU1LCJpYXQiOjE3MzA3MDk5NTUsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9.yjrXwb2IoRIKpoGq1KaWbFgIBC0A_9dgIpdLfIGgELHutsW11NPmcCWGu2YJ8lVk407ipYZsr30vLbH2qbS2Sw"}`, // Ganti dengan token yang sesuai
            },
          }
        );

        console.log("Data added:", response.data);
        this.resetForm();
        this.$router.push({ path: "/Tahun-ajaran" });
      } catch (error) {
        console.error("Error adding data:", error);
        if (error.response) {
          console.log("Error data:", error.response.data);
        }
      }
    },
    resetForm() {
      this.formData.year = null;
      this.formData.active = true; // Reset ke nilai default
    },
  },
};
</script>
