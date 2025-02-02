<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "@/components/AdminPage.vue";
import { reactive } from "vue";
import { StudentService } from "../../services/StudentService";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import LabelError from "@/components/LabelError.vue";

const router = useRouter();

const data = reactive({
  formData: {
    nis: null,
    nisn: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: "",
    email: "",
    description: "",
    userId: "",
  },
  errors: [],
});

const addData = async () => {
  try {
    data.errors = [];
    const response = await StudentService.post(data.formData);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil disimpan.");
      router.push({ path: "/Siswa" });
    } else {
      data.errors = response.errors;
      ToastService.dangerToast(Helper.readError(data.errors, "Message"));
    }
  } catch (error) {
    console.error("Error adding data:", error);
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
  }
};

const resetForm = () => {
  this.formData = {
    nis: null,
    nisn: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: "",
    email: "",
    description: "",
    userId: "",
  };
};
</script>

<template>
  <AdminPage>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Tambah Siswa</h2>
      <form @submit.prevent="addData" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label for="nis" class="block text-gray-700">Nis</label>
              <input id="nis" v-model="data.formData.nis" type="text" class="input-field" required />
            </div>
            <div>
              <label class="block text-gray-700">Nama</label>
              <input v-model="data.formData.name" type="text" class="input-field" required />
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
            <div>
              <label class="block text-gray-700">Jenis Kelamin</label>
              <select v-model="data.formData.gender" class="input-field">
                <option :value="1">Laki-laki</option>
                <option :value="0">Perempuan</option>
              </select>
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
            <div>
              <label class="block text-gray-700">Tempat Lahir</label>
              <input v-model="data.formData.placeOfBorn" type="text" class="input-field" />
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
          </div>
          <div>

            <div>
              <label class="block text-gray-700">Tanggal Lahir</label>
              <input v-model="data.formData.dateOfBorn" type="date" class="input-field" />
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
            <div>
              <label class="block text-gray-700">Email</label>
              <input v-model="data.formData.email" type="email" class="input-field" />
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
            <div>
              <label class="block text-gray-700">Deskripsi</label>
              <textarea v-model="data.formData.description" class="input-field h-28"></textarea>
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Initial"></LabelError>
            </div>
          </div>
        </div>



        <button type="submit" class="w-full bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600">
          Tambah Siswa
        </button>
      </form>
    </div>
  </AdminPage>
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
