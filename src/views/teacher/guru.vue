<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { TeacherService } from "../../services/TeacherService";
import { ToastService } from "../../services/ToastService";
import { DialogService } from "../../services/DialogService";
import { Helper } from "../../helper";

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
    <div
      class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col"
    >
      <router-link :to="{ name: 'addGuru' }">
        <button
          class="transition bg-emerald-400 rounded hover:shadow text-white px-8 py-2 my-3 hover:bg-emerald-500 flex justify-end"
        >
          Tambah
          <svg
            class="w-6 h-6 text-gray-100 dark:text-white ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </router-link>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
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
            <tr
              v-for="(teacher, index) in data.teachers"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="flex justify-start items-center px-6 py-4">
                <img class="w-8 h-8 rounded-full" :src="Helper.getTeacherAvatar(teacher.photo)">
                <span class="ml-2">{{ teacher.name }}</span>
              </td>
              <td class="px-6 py-4">{{ teacher.registerNumber }}</td>
              <td class="px-6 py-4">
                {{ teacher.gender === 1 ? "Laki-laki" : "Perempuan" }}
              </td>
              <td class="px-6 py-4">{{ teacher.placeOfBorn }},   {{!teacher.dateOfBorn?"": Helper.formatDate(teacher.dateOfBorn) }}</td>
              <td class="px-6 py-4">{{ teacher.email }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Guru/${teacher.id}/edit`">
                  <button class="text-white flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-yellow-300 hover:text-emerald-500 dark:text-white ml-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                      />
                    </svg>
                  </button>
                </router-link>
                <button @click="confirmDelete(teacher)" class="text-white flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="w-5 h-5 text-red-500 hover:text-red-800 dark:text-white ml-2"
                    fill="currentColor"
                  >
                    <path
                      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminPage>
</template>
