<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { DepartmentService } from "../../services/DepartmentService";
import AdminPage from "../../components/AdminPage.vue";
import { ToastService } from "../../services/ToastService";

const data = reactive({ form: { name: "", initial: "", description: "" } });
const router = useRouter();
const route = useRoute();

const departmentId = route.params.id;
try {
  const departmentId = route.params.id;
  DepartmentService.getById(departmentId).then((response) => {
    if (response.isSuccess) {
      data.form = response.data;
    }
  });
} catch (error) {
  console.error("Error fetching department data:", error.message);
}

// Fungsi untuk memperbarui data jurusan

const updateDepartment = async () => {
  try {
    const response = await DepartmentService.put(departmentId, data.form);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil disimpan.");
      router.push({ path: "/Jurusan" });
    } else {
      console.log("API Error Response:", response.errors);
      data.errors = response.errors;
      ToastService.dangerToast(Helper.readError(data.errors, "Message"));
    }
  } catch (error) {
    ToastService.dangerToast(error);
  }
};
</script>

<template>
  <AdminPage>
    <div
      class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20 flex flex-col"
    >
      <h2 class="text-2xl font-semibold mb-6">Edit Jurusan</h2>

      <!-- Form Edit Jurusan -->
      <form @submit.prevent="updateDepartment">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama Jurusan</label
          >
          <input
            v-model="data.form.name"
            type="text"
            id="name"
            name="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div class="mb-4">
          <label for="initial" class="block text-sm font-medium text-gray-700"
            >Inisial</label
          >
          <input
            v-model="data.form.initial"
            type="text"
            id="initial"
            name="initial"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            v-model="data.form.description"
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
  </AdminPage>
</template>
