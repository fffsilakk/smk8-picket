<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { reactive } from "vue";
import { StudentService } from "../../services/StudentService";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import LabelError from "../../components/LabelError.vue";

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
      ToastService.addToast("Data berhasil disimpan.", "success");
      router.push({ path: "/Siswa" });
    } else {
      data.errors = response.errors;
      ToastService.addToast(Helper.readError(data.errors, "Message"), "error");
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
    <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20">
      <h2 class="text-2xl font-semibold mb-4">Tambah Siswa</h2>

      <form @submit.prevent="addData" class="space-y-4">
        <div>
          <label for="nis" class="block text-gray-700">Nis</label>
          <input
            id="nis"
            v-model="data.formData.nis"
            type="text"
            class="input-field"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700">Nama</label>
          <input
            v-model="data.formData.name"
            type="text"
            class="input-field"
            required
          />
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">Jenis Kelamin</label>
          <select v-model="data.formData.gender" class="input-field">
            <option :value="1">Laki-laki</option>
            <option :value="0">Perempuan</option>
          </select>
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">Tempat Lahir</label>
          <input
            v-model="data.formData.placeOfBorn"
            type="text"
            class="input-field"
          />
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">Tanggal Lahir</label>
          <input
            v-model="data.formData.dateOfBorn"
            type="date"
            class="input-field"
          />
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">Email</label>
          <input
            v-model="data.formData.email"
            type="email"
            class="input-field"
          />
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">Deskripsi</label>
          <textarea
            v-model="data.formData.description"
            class="input-field"
          ></textarea>
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <div>
          <label class="block text-gray-700">User ID</label>
          <input
            v-model="data.formData.userId"
            type="text"
            class="input-field"
          />
          <LabelError
            v-if="data.errors.length > 0"
            :errors="data.errors"
            propName="Initial"
          ></LabelError>
        </div>
        <button
          type="submit"
          class="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600"
        >
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
