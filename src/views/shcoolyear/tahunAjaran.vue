<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const schoolYears = ref([]);
const form = ref({ name: "", year: "", active: true }); // Tidak ada id di form

const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "bearer " + auth.token;

// Fungsi untuk mengambil data (GET)
const getData = async () => {
  try {
    const response = await axios.get(
      "https://picket.ocph23.tech/api/schoolyear",
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    schoolYears.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Fungsi untuk menambah data (POST)
const addData = async () => {
  try {
    const response = await axios.post(
      "https://picket.ocph23.tech/api/schoolyear",
      form.value,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    schoolYears.value.push(response.data); // ID akan otomatis ditambahkan oleh API
    this.$router.push("/Tahun-ajaran");
    resetForm();
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

// Fungsi untuk memperbarui data (PUT)
const updateData = async (id) => {
  try {
    await axios.put(
      `https://picket.ocph23.tech/api/schoolyear/${id}`,
      form.value,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    getData();
    resetForm();
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async (id) => {
  try {
    await axios.delete(`https://picket.ocph23.tech/api/schoolyear/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    getData();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const resetForm = () => {
  form.value = { name: "", year: "", active: true }; // Hapus ID dari form
};

onMounted(getData);
</script>

<template>
  <div class="p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20 flex flex-col">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-28">
      <router-link :to="{ name: 'addShoolyear' }">
        <button
          @click="addData"
          class="bg-slate-900 rounded-md text-white px-8 py-2 my-3 hover:bg-emerald-500 flex justify-end"
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
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Tahun</th>
            <th scope="col" class="px-6 py-3">Actived</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(schoolYear, index) in schoolYears"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">{{ schoolYear.id }}</td>
            <td class="px-6 py-4">{{ schoolYear.name }}</td>
            <td class="px-6 py-4">{{ schoolYear.year }}</td>
            <td class="px-6 py-4">
              {{ schoolYear.active ? "True" : "False" }}
            </td>
            <td class="px-6 py-4 flex gap-2">
              <router-link :to="`/Tahun-ajaran/${schoolYear.id}/edit`">
                <button
                  @click="form.value = { ...schoolYear }"
                  class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </router-link>
              <button
                @click="deleteData(schoolYear.id)"
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
</template>
