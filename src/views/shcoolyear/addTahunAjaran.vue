<template>
  <form @submit.prevent="addData" class="mt-10 max-w-sm mx-auto pt-10">
    <!-- Input Tahun -->
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
        placeholder="Masukkan Tahun"
        required
      />
    </div>

    <!-- Input Semester -->
    <div class="mb-5">
      <label for="semester" class="block text-gray-700">Semester</label>
      <input
        id="semester"
        v-model.number="formData.semester"
        type="number"
        min="1"
        max="2"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Masukkan Semester (1 atau 2)"
        required
      />
    </div>

    <!-- Status Aktif -->
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

    <!-- Tombol Tambah -->
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
        year: null,
        semester: null,
        active: true, // Nilai default
      },
    };
  },
  setup() {
    const router = useRouter(); // Gunakan router instance
    return { router };
  },
  methods: {
    async addData() {
      try {
        const token = `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmZmRiMDY2LWY1MmQtNGE3Ny05YTgxLWVjNzk1NjFhOTFjMCIsIm5hbWUiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJzdWIiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJlbWFpbCI6ImFkbWluQHBpY2tldC5vY3BoMjMudGVjaCIsImp0aSI6ImJlM2VlMTY3LWZhNTAtNDljZi1iY2M0LTg2NDZiZjdjOWIwMyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMjk0NTMxNiwiZXhwIjoxNzMzNTUwMTE2LCJpYXQiOjE3MzI5NDUzMTYsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9.02z3z6HXHNM1NwItAcPAsua7pWBTNY5AvUsDGRLXUEQK2nMkTeg-RGddSJ-zTI0jC1I6stdlMCk5pj3yPoTk7Q`; // Ganti dengan token yang benar
        const response = await axios.post(
          "https://picket.ocph23.tech/api/schoolyear",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        console.log("Data berhasil ditambahkan:", response.data);
        this.resetForm();
        this.$router.push({ path: "/Tahun-ajaran" }); // Navigasi ke halaman tahun ajaran
      } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan data:", error);
        if (error.response) {
          console.error("Error detail:", error.response.data);
        }
      }
    },
    resetForm() {
      this.formData = {
        year: null,
        semester: null,
        active: true,
      };
    },
  },
};
</script>
