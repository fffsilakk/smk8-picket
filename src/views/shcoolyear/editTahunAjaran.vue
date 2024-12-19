<template>
  <form @submit.prevent="updateData" class="mt-10 max-w-sm mx-auto pt-10">
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
        v-model="formData.actived"
        id="active"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>

    <!-- Tombol Update -->
    <button
      type="submit"
      class="flex justify-center items-center m-auto w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Update
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
  data() {
    return {
      formData: {
        year: null,
        semester: null,
        actived: true,
      },
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  methods: {
    async fetchData() {
      try {
        const id = this.route.params.id;
        const response = await axios.get(
          `https://picket.ocph23.tech/api/schoolyear/${id}`
        );

        this.formData = response.data;
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    },
    async updateData() {
      try {
        const id = this.route.params.id;
        await axios.put(
          `https://picket.ocph23.tech/api/schoolyear/${id}`,
          this.formData,
        );

        console.log("Data berhasil diupdate");
        this.$router.push({ path: "/Tahun-ajaran" });
      } catch (error) {
        console.error("Gagal mengupdate data:", error);
        if (error.response) {
          console.error("Detail error:", error.response.data);
        }
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
