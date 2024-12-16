<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "bearer " + auth.token;

const form = ref({
  number: "",
  name: "",
  gender: 1,
  placeOfBorn: "",
  dateOfBorn: "",
  email: "",
  description: "",
  userId: "",
});

// Fungsi untuk menambah data siswa (POST)
const addStudent = async () => {
  try {
    await axios.post("https://picket.ocph23.tech/api/student", form.value, {
      headers: { Authorization: authToken },
    });
    router.push("/Siswa");
    resetForm();
  } catch (error) {
    console.error("Error adding student data:", error);
  }
};

// Fungsi untuk mengatur ulang form
const resetForm = () => {
  form.value = {
    number: "",
    name: "",
    gender: 1,
    placeOfBorn: "",
    dateOfBorn: "",
    email: "",
    description: "",
    userId: "",
  };
};
</script>

<template>
  <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20">
    <h2 class="text-2xl font-semibold mb-4">Tambah Siswa</h2>

    <form @submit.prevent="addStudent" class="space-y-4">
      <div>
        <label class="block text-gray-700">Nomor</label>
        <input v-model="form.number" type="text" class="input-field" required />
      </div>
      <div>
        <label class="block text-gray-700">Nama</label>
        <input v-model="form.name" type="text" class="input-field" required />
      </div>
      <div>
        <label class="block text-gray-700">Jenis Kelamin</label>
        <select v-model="form.gender" class="input-field">
          <option :value="1">Laki-laki</option>
          <option :value="0">Perempuan</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700">Tempat Lahir</label>
        <input v-model="form.placeOfBorn" type="text" class="input-field" />
      </div>
      <div>
        <label class="block text-gray-700">Tanggal Lahir</label>
        <input v-model="form.dateOfBorn" type="date" class="input-field" />
      </div>
      <div>
        <label class="block text-gray-700">Email</label>
        <input v-model="form.email" type="email" class="input-field" />
      </div>
      <div>
        <label class="block text-gray-700">Deskripsi</label>
        <textarea v-model="form.description" class="input-field"></textarea>
      </div>
      <div>
        <label class="block text-gray-700">User ID</label>
        <input v-model="form.userId" type="text" class="input-field" />
      </div>
      <button
        type="submit"
        class="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600"
      >
        Tambah Siswa
      </button>
    </form>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
}
</style>
