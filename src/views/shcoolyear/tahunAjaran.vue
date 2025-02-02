<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { SchoolYearService } from "../../services/SchoolYearService";
import { ToastService } from "../../services/ToastService";
import { DialogService } from "../../services/DialogService";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import AddIcon from "@/components/Icons/AddIcon.vue";
const router = useRouter();
const data = reactive({
  schoolYears: [],
  form: { name: null, year: null, semester: null, active: true },
});

// Fungsi untuk mengambil data (GET)
const getData = async () => {
  try {
    const response = await SchoolYearService.get();
    if (response.isSuccess) {
      data.schoolYears = response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async (schoolYear) => {
  try {
    const response = await SchoolYearService.delete(schoolYear.id);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil dihapus.");
      let index = data.schoolYears.indexOf(schoolYear);
      data.schoolYears.splice(index, 1);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const confirmDelete = (schoolYear) => {
  DialogService.showDialog(
    `Apakah Anda yakin ingin menghapus Tahun Ajaran ${schoolYear.name} ?`,
    schoolYear,
    "warning",
    3000,
    "Batal",
    "Hapus"
  ).then((result) => {
    deleteData(schoolYear);
  });
};

const resetForm = () => {
  form.value = { name: "", year: "", semester: "", active: true };
};

onMounted(getData);
</script>

<template>
  <AdminPage>
    <div>

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Data Tahun Ajaran</h1>
        <router-link :to="{ name: 'addShoolyear' }">
          <AddIcon />
        </router-link>
      </div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">No</th>
              <th scope="col" class="px-6 py-3">Nama</th>
              <th scope="col" class="px-6 py-3">Semester</th>
              <th scope="col" class="px-6 py-3">Tahun</th>
              <th scope="col" class="px-6 py-3">Actived</th>
              <th scope="col" class="w-44 px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(schoolYear, index) in data.schoolYears" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ schoolYear.name }}</td>
              <td class="px-6 py-4">{{ schoolYear.semester }}</td>
              <td class="px-6 py-4">{{ schoolYear.year }}</td>
              <td class="px-6 py-4">
                {{ schoolYear.actived ? "True" : "False" }}
              </td>
              <td class="w-auto px-6 py-4 flex gap-2 items-center justify-start">
                <router-link :to="`/Tahun-ajaran/${schoolYear.id}/edit`">
                  <button class="text-white flex">
                    <EditIcon />
                  </button>
                </router-link>
                <button @click="confirmDelete(schoolYear)" class="text-white flex">
                  <DeleteIcon />
                </button>
                <router-link :to="`/Jadwal/${schoolYear.id}`">
                  <button @click="form.value = { ...schedule }"
                    class="bg-teal-500 flex text-white px-4 rounded-md py-2 font-semibold hover:bg-teal-800">
                    Jadwal
                    <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminPage>
</template>
