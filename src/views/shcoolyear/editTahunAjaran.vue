<template>
  <form @submit.prevent="updateSchoolyear" class="max-w-sm mx-auto pt-12">
    <!-- Tahun Input -->
    <div class="mb-5">
      <label
        for="yearpicker"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Year</label
      >
      <input
        id="yearpicker"
        type="number"
        v-model="schoolyear.year"
        min="1900"
        max="2100"
        step="1"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Masukan Tahun"
        required
      />
    </div>

    <!-- Active Status -->
    <div class="mb-5">
      <label
        for="active"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Active</label
      >
      <select
        id="active"
        v-model="schoolyear.active"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        required
      >
        <option :value="true">True</option>
        <option :value="false">False</option>
      </select>
    </div>
    <button
      type="submit"
      class="flex justify-center items-center m-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Update
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { onMounted, toRaw } from "vue";
import { useRoute } from "vue-router";

export default {
  props: ["id"],
  data() {
    return {
      schoolyear: {
        year: "",
        active: false,
      },
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchSchoolyear();
        }
      },
    },
  },
  mounted() {
    this.fetchSchoolyear();
  },
  methods: {
    async fetchSchoolyear() {
      const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
      if (!token) {
        alert("Token tidak ditemukan. Pastikan Anda sudah login.");
        return;
      }
      try {
        const response = await axios.get(
          `https://picket.ocph23.tech/api/schoolyear/${this.$route.params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiYWVlYzAyLWVkZjAtNGMyZS1hODMwLTRmZjFmYzgyNDllOSIsIm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImp0aSI6IjhkYzQ3MWU5LWEzOTItNGYxNi04M2E1LWY2NDc2ZmFlZDMwZSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMTE0MDAzMiwiZXhwIjoxNzMxNzQ0ODMyLCJpYXQiOjE3MzExNDAwMzIsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9._IUaCNvlyqUTtdYetdRyy-erIq7axMy3ZbSfn_VNoTZjFw9wWa-qfXI3jWmYgbqVOqaP_tCd63mtamzwd1SVMQ"}`,
            },
          }
        );
        this.schoolyear = response.data;
      } catch (error) {
        console.error("Error fetching schoolyear data:", error);
        alert("Gagal mengambil data tahun ajaran.");
      }
    },
    async updateSchoolyear() {
      const token = localStorage.getItem("authToken");
      console.log("ID Tahun Ajaran:", this.id);
      if (!token) {
        alert("Token tidak ditemukan. Pastikan Anda sudah login.");
        return;
      }
      try {
        let data = toRaw(this.schoolyear);
        console.log(data);
        const response = await axios.put(
          `https://picket.ocph23.tech/api/schoolyear/${this.$route.params.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiYWVlYzAyLWVkZjAtNGMyZS1hODMwLTRmZjFmYzgyNDllOSIsIm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImp0aSI6IjhkYzQ3MWU5LWEzOTItNGYxNi04M2E1LWY2NDc2ZmFlZDMwZSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMTE0MDAzMiwiZXhwIjoxNzMxNzQ0ODMyLCJpYXQiOjE3MzExNDAwMzIsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9._IUaCNvlyqUTtdYetdRyy-erIq7axMy3ZbSfn_VNoTZjFw9wWa-qfXI3jWmYgbqVOqaP_tCd63mtamzwd1SVMQ"}`,
            },
          }
        );
        alert("Data tahun ajaran berhasil diperbarui!");
        this.$router.push({ path: "/Tahun-ajaran" });
      } catch (error) {
        console.error("Error updating schoolyear:", error);
        alert("Gagal memperbarui data tahun ajaran.");
      }
    },
  },
};
</script>
