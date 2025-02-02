<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { DepartmentService } from "../../services/DepartmentService";
import { ToastService } from "../../services/ToastService";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";
import { DialogService } from "../../services/DialogService";
import DeleteIcon from "../../components/icons/DeleteIcon.vue";
import AddIcon from "../../components/Icons/AddIcon.vue";
import EditIcon from "@/components/Icons/EditIcon.vue";
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
  DialogService.showDialog(
    `Apakah Anda yakin ingin menghapus jurusan ${department.name} ?`,
    department,
    "warning",
    3000,
    "Batal",
    "Hapus"
  ).then((result) => {
    deleteData(department);
  });
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async (department) => {
  if (department) {
    try {
      const response = await DepartmentService.delete(department.id);
      if (response.isSuccess) {
        ToastService.successToast("Data berhasil dihapus.");
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
    <div class="">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Data Jurusan</h1>
        <router-link :to="{ name: 'addJurusan' }">
          <AddIcon />
        </router-link>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Nama Jurusan</th>
              <th scope="col" class="px-6 py-3">Initial</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th class="w-24 px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(department, index) in data.departments" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ department.name }}</td>
              <td class="px-6 py-4">{{ department.initial }}</td>
              <td class="px-6 py-4">{{ department.description }}</td>
              <td class="px-6 py-4 flex gap-2">
                <router-link :to="`/Jurusan/${department.id}/edit`">
                  <button class="text-white flex">
                   <EditIcon />
                  </button>
                </router-link>
                <button @click="confirmDelete(department)" class="text-white flex">
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
