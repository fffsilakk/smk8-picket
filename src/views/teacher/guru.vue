<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
const router = useRouter();

const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "bearer " + auth.token;

const teachers = ref([]);

// Fungsi untuk mengambil data (GET)
// const getStudents = async () => {
//   try {
//     const response = await axios.get("https://picket.ocph23.tech/api/student", {
//       headers: { Authorization: authToken },
//     });
//     students.value = response.data;
//   } catch (error) {
//     console.error("Error fetching student data:", error.message);
//   }
// };

// Fungsi untuk menambah data guru (POST)
const addTeacher = async () => {
  try {
    const response = await axios.post(
      "https://picket.ocph23.tech/api/teacher",
      form.value,
      {
        headers: { Authorization: authToken },
      }
    );
    teachers.value.push(response.data);
    router.push("/Teacher");
    resetForm();
  } catch (error) {
    console.error("Error adding student data:", error);
  }
};

// Fungsi untuk mengambil data guru/ (GET)
const getTeachers = async () => {
  try {
    const response = await axios.get("https://picket.ocph23.tech/api/teacher", {
      headers: { Authorization: authToken },
    });
    teachers.value = response.data;
  } catch (error) {
    console.error("Error fetching student data:", error.message);
  }
};

// Fungsi untuk memperbarui data mahasiswa (PUT)
const updateTeacher = async (id) => {
  try {
    await axios.put(
      `https://picket.ocph23.tech/api/teacher/${id}`,
      form.value,
      {
        headers: { Authorization: authToken },
      }
    );
    getTeachers();
    resetForm();
  } catch (error) {
    console.error("Error updating student data:", error);
  }
};

// Fungsi untuk menghapus data mahasiswa (DELETE)
const deleteTeacher = async (id) => {
  try {
    await axios.delete(`https://picket.ocph23.tech/api/teacher/${id}`, {
      headers: { Authorization: authToken },
    });
    getTeachers();
  } catch (error) {
    console.error("Error deleting student data:", error);
  }
};

const resetForm = () => {
  form.value = {
    number: "",
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  };
};

// Fungsi untuk memformat tanggal
const formatDate = (dateOfBorn) => {
  const date = new Date(dateOfBorn);

  // Mengecek apakah tanggal valid
  if (!isNaN(date)) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return "Tanggal Tidak Tersedia";
};

onMounted(getTeachers);
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
              <th class="px-6 py-3">Id</th>
              <th class="px-6 py-3">Nomor</th>
              <th class="px-6 py-3">Nama</th>
              <th class="px-6 py-3">Jenis Kelamin</th>
              <th class="px-6 py-3">Tempat Lahir</th>
              <th class="px-6 py-3">Tanggal Lahir</th>
              <th class="px-6 py-3">Email</th>
              <th class="px-6 py-3">Deskripsi</th>
              <th class="px-6 py-3">User ID</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(teacher, index) in teachers"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ teacher.number }}</td>
              <td class="px-6 py-4">{{ teacher.name }}</td>
              <td class="px-6 py-4">
                {{ teacher.gender === 1 ? "Laki-laki" : "Perempuan" }}
              </td>
              <td class="px-6 py-4">{{ teacher.placeOfBorn }}</td>
              <td class="px-6 py-4">
                {{ formatDate(teacher.dateOfBorn) }}
              </td>
              <td class="px-6 py-4">{{ teacher.email }}</td>
              <td class="px-6 py-4">{{ teacher.description }}</td>
              <td class="px-6 py-4">{{ teacher.userId }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Guru/${teacher.id}/edit`">
                  <button
                    class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </router-link>
                <button
                  @click="deleteTeacher(teacher.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
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
