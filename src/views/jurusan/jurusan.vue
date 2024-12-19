<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { DepartmentService } from "../../services/DepartmentService";
import { ToastService } from "../../services/ToastService";

const router = useRouter();
const data = reactive({ dapartments: [], form: { name: "", initial: "", description: "" } })
// Fungsi untuk mengambil data (GET)
const getData = async () => {
  try {

    const response = await DepartmentService.get();
    if (response.isSuccess) {
      data.departments = response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async (department) => {
  try {
    const response  = await DepartmentService.delete(department.id);
    if(response.isSuccess){
      ToastService.addToast("Data berhasil dihapus.", 'success');
      var index = data.departments.indexOf(department);
      data.departments.splice(index, 1);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const resetForm = () => {
  form.value = { name: "", initial: "", description: "" };
};

onMounted(getData);
</script>

<template>
  <AdminPage>
    <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col">
      <router-link :to="{ name: 'addJurusan' }">
        <button
          class="transition bg-emerald-400 rounded hover:shadow text-white px-8 py-2 my-3 hover:bg-emerald-500 flex justify-end">
          Tambah
          <svg class="w-6 h-6 text-gray-100 dark:text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24">
            <path fill-rule="evenodd"
              d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </router-link>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Nama</th>
              <th scope="col" class="px-6 py-3">Initial</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(department, index) in data.departments" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ department.name }}</td>
              <td class="px-6 py-4">{{ department.initial }}</td>
              <td class="px-6 py-4">{{ department.description }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Jurusan/${department.id}/edit`">
                  <button 
                    class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                </router-link>
                <button @click="deleteData(department)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminPage>
</template>
