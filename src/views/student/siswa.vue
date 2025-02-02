<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { StudentService } from "../../services/StudentService";
import { ToastService } from "../../services/ToastService";
import { DialogService } from "../../services/DialogService";
import { Helper } from "../../helper";
import AddIcon from "../../components/Icons/AddIcon.vue";
import EditIcon from "../../components/icons/EditIcon.vue";
import DeleteIcon from "../../components/icons/DeleteIcon.vue";
import Pagination from "../../components/Pagination.vue";
import { paginationState } from "../../services/pagination";

const router = useRouter();
const paginateState = paginationState();

const data = reactive({
  pageSizes: [5, 10, 50, 100],
  paginate: {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortOrder: "desc",
    columnOrder: "date",
  },
});


const dataxx = reactive({
  students: [],
  form: {
    nis: null,
    nisn: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  },
});

// Fungsi untuk mengambil data siswa (GET)
const getData = async (paginate) => {
  const result = await StudentService.Pageninate(paginate);
  if (result.isSuccess) {
    data.paginateResult = result.data;
    paginateState.setPaginateResult(result.data);
  }
};

// Fungsi untuk menghapus data siswa (DELETE)
const deleteData = async (student) => {
  try {
    const response = await StudentService.delete(student.id);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil dihapus.");
      let index = data.students.indexOf(student);
      data.students.splice(index, 1);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const resetForm = () => {
  form.value = {
    nis: null,
    nisn: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  };
};

const confirmDelete = (student) => {
  DialogService.showDialog(
    `Apakah Anda yakin ingin menghapus ${student.name} ?`,
    student,
    "warning",
    3000,
    "Batal",
    "Hapus"
  ).then((result) => {
    deleteData(student);
  });
};

const changePageSize = (event) => {
  paginateState.setPaginateResult({paginateResult:{data:[]}});
  data.paginate.page = 1;
  getData(data.paginate);

};
onMounted(()=>{
  paginateState.setPaginateResult({paginateResult:{data:[]}});
  getData(data.paginate)
});
</script>

<template>
  <AdminPage>
    <div >

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Data Siswa</h1>
        <router-link :to="{ name: 'addSiswa' }">
          <AddIcon></AddIcon>
        </router-link>

      </div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <div class="my-2 flex sm:flex-row flex-col items-center sm:justify-between">
          <select v-model="data.paginate.pageSize" @change="changePageSize">
            <option v-for="item in data.pageSizes" :value="item">
              {{ item }}
            </option>
          </select>
          <input v-model="data.paginate.searchTerm" type="text" placeholder="Search..." @change="getData(data.paginate)"
            class="p-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700" />
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">NO</th>
              <th class="px-6 py-3">Nama</th>
                <th class="px-6 py-3">Nis</th>
              <th class="px-6 py-3">Kelamin</th>
              <th class="px-6 py-3">TTL</th>
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
             <tr v-for="(student, index) in paginateState.paginateResult.data" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="flex justify-start items-center px-6 py-4">
                <img class="w-8 h-8 rounded-full" :src="Helper.getStudentAvatar(student.photo)">
                <span class="ml-2">{{ student.name }}</span>
              </td>
              <td class="px-6 py-4">{{ student.nis }}</td>
              <td class="px-6 py-4">
                {{ student.gender === 1 ? "Laki-laki" : "Perempuan" }}
              </td>
              <td class="px-6 py-4">{{ student.placeOfBorn }}, {{ !student.dateOfBorn ? "" :
                Helper.formatDate(student.dateOfBorn) }}</td>

              <td class="px-6 py-4">{{ student.email }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Siswa/${student.id}/edit`">
                  <EditIcon></EditIcon>
                </router-link>
                <button @click="confirmDelete(student)" class="text-white flex">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-if="paginateState.paginateResult" :paginate="data.paginate" @onChangePage="getData"></Pagination>
      </div>
    </div>
  </AdminPage>
</template>
