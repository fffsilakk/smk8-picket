<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from '../../components/AdminPage.vue'
import { ClassRoomService } from '../../services/ClassRoomService'

const classrooms = ref([]);
const form = ref({
  className: "",
  departmentName: "",
  departmentInitial: "",
  classLeaderName: "",
  homeRoomTeacherName: "",
  departmentId: 0,
  classRommLeaderId: 0,
  homeRoomTeacherId: 0,
});
const showModal = ref(false);
const router = useRouter();

try {

  ClassRoomService.get().then((response) => {
    classrooms.value = response.data;
  });
} catch (error) {
  console.error("Error fetching data:", error.message);
}

const addClassroom = async () => {
  try {
    const requestBody = {
      name: form.value.className,
      departmentId: form.value.departmentId,
      classRommLeaderId: form.value.classRommLeaderId,
      homeRoomTeacherId: form.value.homeRoomTeacherId,
    };

    const response = await axios.post(
      "https://picket.ocph23.tech/api/classroom",
      requestBody,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    classrooms.value.push(response.data);
    getclassroom();
    showModal.value = false;
    resetForm();
  } catch (error) {
    console.error(
      "Error adding classroom:",
      error.response?.data || error.message
    );
    alert("Failed to add classroom. Please check the input data.");
  }
};

// Function to reset the form
const resetForm = () => {
  form.value = {
    className: "",
    departmentName: "",
    departmentInitial: "",
    classLeaderName: "",
    homeRoomTeacherName: "",
    name: "string",
    departmentId: 0,
    classRommLeaderId: 0,
    homeRoomTeacherId: 0,
  };
};

</script>

<template>
  <AdminPage>
    <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col">
      <button @click="showModal = true" class="transition rounded text-black my-3 w-6 items-center text-center">
        <svg class="w-8 h-8 dark:text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Modal -->
      <div v-if="showModal" class="modal modal-open">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Tambah Kelas</h3>
          <form @submit.prevent="addClassroom">
            <div class="form-control">
              <label class="label">Nama Kelas</label>
              <input v-model="form.className" class="input input-bordered" type="text" required />
            </div>
            <div class="form-control">
              <label class="label">Inisial Jurusan</label>
              <input v-model="form.departmentInitial" class="input input-bordered" type="text" required />
            </div>
            <div class="form-control">
              <label class="label">Nama Jurusan</label>
              <select v-model="form.departmentId" class="input input-bordered" required>
                <option value="">Pilih Jurusan</option>
                <option value="1">Rekayasa Perangkat Lunak</option>
                <option value="2">Teknik Komputer & Jaringan</option>
                <option value="3">Teknik Kimia Industri</option>
                <option value="4">Desain Komunikasi Visual</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">Ketua Kelas</label>
              <select v-model="form.classRommLeaderId" class="input input-bordered" required>
                <option value="">Pilih Ketua Kelas</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">Wali Kelas</label>
              <select v-model="form.homeRoomTeacherId" class="input input-bordered" required>
                <option value="">Pilih Wali Kelas</option>
                <option value="1">Avif Setyawan</option>
                <option value="2">Ismael</option>
                <option value="3">Fidel</option>
              </select>
            </div>

            <div class="modal-action">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" @click="showModal = false" class="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Classroom Table -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">No</th>
              <th class="px-6 py-3">Nama Kelas</th>
              <th class="px-6 py-3">Nama Jurusan</th>
              <th class="px-6 py-3">Ketua Kelas</th>
              <th class="px-6 py-3">Wali Kelas</th>
              <th class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(classroom, index) in classrooms" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                {{ classroom.name }}
              </td>
              <td class="px-6 py-4">{{ classroom.departmentName }}</td>
              <td class="px-6 py-4">{{ classroom.classLeaderName }}</td>
              <td class="px-6 py-4">{{ classroom.homeRoomTeacherName }}</td>
              <td class="px-6 py-4 flex gap-2 items-center justify-start">
                <router-link :to="`/Tahun-ajaran/${classroom.id}/edit`">
                  <button class="text-black rounded-lg hover:text-slate-500 transition-all duration-200"></button>
                </router-link>
                <button @click="deleteData(classroom.id)"
                  class="transition-all duration-200 text-red-500 hover:text-red-700 rounded-lg"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </AdminPage>
</template>
