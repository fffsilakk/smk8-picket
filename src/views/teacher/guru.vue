<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { TeacherService } from "../../services/TeacherService";
import { ToastService } from "../../services/ToastService";
import { DialogService } from "../../services/DialogService";
import { Helper } from "../../helper";
import EditIcon from "../../components/icons/EditIcon.vue";
import DeleteIcon from "../../components/icons/DeleteIcon.vue";
import AddIcon from "../../components/Icons/AddIcon.vue";


const router = useRouter();

const data = reactive({
  teachers: [],
  form: {
    registerNumber: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  },
});

// Fungsi untuk mengambil data guru/ (GET)
const getData = async () => {
  try {
    const response = await TeacherService.get();
    if (response.isSuccess) {
      data.teachers = response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Fungsi untuk menghapus data mahasiswa (DELETE)
const deleteData = async (teacher) => {
  try {
    const response = await TeacherService.delete(teacher.id);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil dihapus.");
      let index = data.teachers.indexOf(teacher);
      data.teachers.splice(index, 1);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const resetForm = () => {
  form.value = {
    registerNumber: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  };
};

const confirmDelete = (teacher) => {
  DialogService.showDialog(
    `Apakah Anda yakin ingin menghapus ${teacher.name} ?`,
    teacher,
    "warning",
    3000,
    "Batal",
    "Hapus"
  ).then((result) => {
    deleteData(teacher);
  });
};


onMounted(getData);
</script>

<template>
  <AdminPage>
    <div>

      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Data Guru</h1>
        <router-link :to="{ name: 'addGuru' }">
          <AddIcon />
        </router-link>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="w-3 px-6 py-3">Id</th>
              <th class="px-6 py-3">Nama</th>
              <th class="px-6 py-3">NIP/Nomor Induk</th>
              <th class="px-6 py-3">Jenis Kelamin</th>
              <th class="px-6 py-3">TTL</th>
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(teacher, index) in data.teachers" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="flex justify-start items-center px-6 py-4">
                <img class="w-8 h-8 rounded-full" :src="Helper.getTeacherAvatar(teacher.photo)">
                <span class="ml-2">{{ teacher.name }}</span>
              </td>
              <td class="px-6 py-4">{{ teacher.registerNumber }}</td>
              <td class="px-6 py-4">
                {{ teacher.gender === 1 ? "Laki-laki" : "Perempuan" }}
              </td>
              <td class="px-6 py-4">{{ teacher.placeOfBorn }}, {{ !teacher.dateOfBorn ? "" :
                Helper.formatDate(teacher.dateOfBorn) }}</td>
              <td class="px-6 py-4">{{ teacher.email }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Guru/${teacher.id}/edit`">
                  <button class="text-white flex">
                    <EditIcon></EditIcon>
                  </button>
                </router-link>
                <button @click="confirmDelete(teacher)" class="text-white flex cursor-pointer">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminPage>
</template>
