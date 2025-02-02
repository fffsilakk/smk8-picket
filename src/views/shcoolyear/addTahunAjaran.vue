<template>
  <AdminPage>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="text-2xl font-semibold mb-6">Tambah Tahun Ajaran</h2>
        <form @submit.prevent="addData" >
          <!-- Input Tahun -->
          <div class="mb-5">
            <label for="yearpicker" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
            <input v-model="data.formData.year" id="yearpicker" type="number" min="1900" max="2100" step="1"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Tahun" required />
            <LabelError v-if="data.errors.length > 0" :errors="data.errors" :propName="'Year'"></LabelError>
          </div>

          <!-- Input Semester -->
          <div class="mb-5">
            <label for="semester" class="block text-gray-700">Semester</label>
            <input id="semester" v-model.number="data.formData.semester" type="number" min="1" max="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Masukkan Semester (1 atau 2)" required />
            <LabelError v-if="data.errors.length > 0" :errors="data.errors" :propName="'Semester'"></LabelError>
          </div>

          <!-- Status Aktif -->
          <div class="mb-5">
            <label for="active" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active</label>
            <select v-model="data.formData.actived" id="active"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <!-- Tombol Tambah -->
          <button type="submit"
            class="flex justify-center items-center m-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tambah
          </button>
        </form>
      </div>
    </div>
  </AdminPage>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ToastService } from "../../services/ToastService";
import { SchoolYearService } from "../../services/SchoolYearService";
import { Helper } from "../../helper";
import { reactive } from 'vue';
import LabelError from "@/components/LabelError.vue";
import AdminPage from "@/components/AdminPage.vue";

const router = useRouter(); // Gunakan router instance
const data = reactive({
  formData: {
    year: null,
    semester: null,
    actived: true, // Nilai default
  },
  errors: []
})


const addData = async () => {
  try {
    const response = await SchoolYearService.post(data.formData);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil ditambahkan", "success");
      this.router.push({ path: "/Tahun-ajaran" }); // Navigasi ke halaman tahun ajaran
    } else {
      data.errors = response.errors;
      ToastService.dangerToast(Helper.readError(data.errors, "Message"), "error");
    }
  } catch (error) {
    ToastService.dangerToast("Terjadi kesalahan saat menambahkan data", "error");
  }
};

const resetForm = () => {
  data.formData = {
    year: null,
    semester: null,
    actived: true,
  };
}
</script>
