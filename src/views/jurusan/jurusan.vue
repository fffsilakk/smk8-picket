<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { DepartmentService } from "../../services/DepartmentService";
import { ToastService } from "../../services/ToastService";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";
import { DialogService } from "../../services/DialogService";
const router = useRouter();

const data = reactive({
  departments: [],
  form: { name: "", initial: "", description: "" },
});

// Fungsi untuk mengambil data (GET)
const getData = async () => {
  try {
    const response = await DepartmentService.get();
    if (response.isSuccess) {
      data.departments = response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const confirmDelete = (department) => {
  DialogService.showDialog(`Apakah Anda yakin ingin menghapus jurusan ${department.name} ?`,department).then(result=>{
      deleteData(department);
  });
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async (department) => {
  if (department) {
    try {
      const response = await DepartmentService.delete(
        department.id
      );
      if (response.isSuccess) {
        ToastService.addToast("Data berhasil dihapus.", "success");
        let index = data.departments.indexOf(department);
        data.departments.splice(index, 1);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      data.showDeleteModal = false;
    }
  }
};

onMounted(getData);
</script>
<template>
  <AdminPage>
    <div
      class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col"
    >
      <router-link :to="{ name: 'addJurusan' }">
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
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Nama Jurusan</th>
              <th scope="col" class="px-6 py-3">Initial</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(department, index) in data.departments"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ department.name }}</td>
              <td class="px-6 py-4">{{ department.initial }}</td>
              <td class="px-6 py-4">{{ department.description }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Jurusan/${department.id}/edit`">
                  <button class="text-white flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-black hover:text-emerald-500 dark:text-white ml-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                      />
                    </svg>
                  </button>
                </router-link>
                <button
                  @click="confirmDelete(department)"
                  class="text-white flex"
                >
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
      <div
        v-if="data.showDeleteModal"
        class="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p>
            Apakah Anda yakin ingin menghapus jurusan
            {{ data.departmentToDelete?.name }}?
          </p>
          <div class="mt-4 flex gap-4 justify-end">
            <button
              @click="cancelDelete"
              class="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Batal
            </button>
            <button
              @click="deleteData"
              class="px-4 py-2 bg-red-500 text-white rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <ConfirmDeleteModal
      :showModal="data.showDeleteModal"
      :departmentToDelete="data.departmentToDelete"
      @cancel="cancelDelete"
      @delete="deleteData"
    /> -->
  </AdminPage>
</template>
