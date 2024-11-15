<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const studentId = route.params.id;
const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "bearer " + auth.token;

const form = ref({
  number: "",
  name: "",
  gender: 0,
  placeOfBorn: "",
  dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
  email: "",
  description: "",
  userId: "",
});

// Fetch student data to populate the form for editing
const getTeacher = async (id) => {
  try {
    const response = await axios.get(
      `https://picket.ocph23.tech/api/teacher/${studentId}`,
      {
        headers: { Authorization: authToken },
      }
    );
    form.value = response.data;
  } catch (error) {
    console.error("Error fetching student data for edit:", error);
  }
};

// Handle form submission to update student
const updateTeacher = async () => {
  const id = route.params.id;
  try {
    await axios.put(
      `https://picket.ocph23.tech/api/teacher/${studentId}`,
      form.value,
      {
        headers: { Authorization: authToken },
      }
    );
    router.push("/Guru"); // Redirect to students list page after successful update
  } catch (error) {
    console.error("Error updating student data:", error);
  }
};

// Fetch student data when the component is mounted
onMounted(() => {
  const teacherId = route.params.id;
  getTeacher(teacherId);
});
</script>

<template>
  <div
    class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20 flex flex-col"
  >
    <h2 class="text-xl font-semibold mb-5">Edit Data Guru</h2>

    <form @submit.prevent="updateTeacher">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="number"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nomor</label
          >
          <input
            type="text"
            id="number"
            v-model="form.number"
            class="input-field"
            required
          />
        </div>

        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="input-field"
            required
          />
        </div>

        <div>
          <label
            for="gender"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Jenis Kelamin</label
          >
          <select
            id="gender"
            v-model="form.gender"
            class="input-field"
            required
          >
            <option value="1">Perempuan</option>
            <option value="0">Laki-laki</option>
          </select>
        </div>

        <div>
          <label
            for="placeOfBorn"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tempat Lahir</label
          >
          <input
            type="text"
            id="placeOfBorn"
            v-model="form.placeOfBorn"
            class="input-field"
            required
          />
        </div>

        <div>
          <label
            for="dateOfBorn"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tanggal Lahir</label
          >
          <input
            type="date"
            id="dateOfBorn"
            v-model="form.dateOfBorn"
            class="input-field"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="input-field"
            required
          />
        </div>

        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Deskripsi</label
          >
          <textarea
            id="description"
            v-model="form.description"
            class="input-field"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label
            for="userId"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >User ID</label
          >
          <input
            type="text"
            id="userId"
            v-model="form.userId"
            class="input-field"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="bg-slate-900 text-white py-2 px-4 rounded hover:bg-emerald-500"
      >
        Update
      </button>
    </form>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
}
</style>
