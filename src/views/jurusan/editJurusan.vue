<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const form = ref({ name: "", initial: "", description: "" });
const router = useRouter();
const route = useRoute();

const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "bearer " + auth.token;

// Fungsi untuk mengambil data jurusan berdasarkan ID
const getDepartment = async (id) => {
  try {
    const response = await axios.get(
      `https://picket.ocph23.tech/api/department/${id}`,
      {
        headers: { Authorization: authToken },
      }
    );
    form.value = response.data;
  } catch (error) {
    console.error("Error fetching department data:", error.message);
  }
};

// Fungsi untuk memperbarui data jurusan
const updateDepartment = async () => {
  const id = route.params.id; // Ambil ID dari URL
  try {
    await axios.put(
      `https://picket.ocph23.tech/api/department/${id}`,
      form.value,
      {
        headers: { Authorization: authToken },
      }
    );
    router.push("/Jurusan"); // Arahkan kembali ke halaman utama setelah update
  } catch (error) {
    console.error("Error updating department:", error.message);
  }
};

// Ambil data jurusan saat halaman dimuat
onMounted(() => {
  const departmentId = route.params.id;
  getDepartment(departmentId);
});
</script>

<template>
  <div
    class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20 flex flex-col"
  >
    <h2 class="text-2xl font-semibold mb-6">Edit Jurusan</h2>

    <!-- Form Edit Jurusan -->
    <form @submit.prevent="updateDepartment">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Nama</label
        >
        <input
          v-model="form.name"
          type="text"
          id="name"
          name="name"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="initial" class="block text-sm font-medium text-gray-700"
          >Initial</label
        >
        <input
          v-model="form.initial"
          type="text"
          id="initial"
          name="initial"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="form.description"
          id="description"
          name="description"
          rows="4"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        ></textarea>
      </div>

      <!-- Tombol Submit -->
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Simpan Perubahan
      </button>
    </form>
  </div>
</template>
