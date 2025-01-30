<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from "../../components/AdminPage.vue";
import { reactive } from "vue";
import { TeacherService } from "../../services/TeacherService";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import LabelError from "../../components/LabelError.vue";

const router = useRouter();
const data = reactive({
  formData: {
    registerNumber: null,
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

// Fungsi untuk menambah data Guru (POST)
const addData = async () => {
  try {
    data.errors = [];
    const response = await TeacherService.post(data.formData);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil disimpan.");
      router.push({ path: "/Guru" });
    } else {
      console.log("API Error Response:", response.errors);
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

// Fungsi untuk mengatur ulang form
const resetForm = () => {
  this.formData = {
    registerNumber: null,
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
    <div>

      <div class="">
        <div class="bg-white shadow-md rounded-lg p-6">
          <h1 class="text-2xl font-semibold mb-6 text-left text-gray-800">
            Tambah Guru
          </h1>
          <form
            @submit.prevent="addData"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label for="number" class="block text-gray-700 font-medium">
                NIP/Nomor Register
              </label>
              <input
                id="number"
                v-model="data.formData.registerNumber"
                class="input-field"
                required
              />
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div>
              <label for="name" class="block text-gray-700 font-medium"
                >Nama</label
              >
              <input
                id="name"
                v-model="data.formData.name"
                type="text"
                class="input-field"
                required
              />
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div>
              <label for="gender" class="block text-gray-700 font-medium">
                Jenis Kelamin
              </label>
              <select v-model="data.formData.gender" class="input-field">
                <option :value="0">Laki-laki</option>
                <option :value="1">Perempuan</option>
              </select>
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div>
              <label for="placeOfBorn" class="block text-gray-700 font-medium"
                >Tempat Lahir</label
              >
              <input
                id="placeOfBorn"
                v-model="data.formData.placeOfBorn"
                type="text"
                class="input-field"
              />
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div>
              <label for="dateOfBorn" class="block text-gray-700 font-medium"
                >Tanggal Lahir</label
              >
              <input
                id="dateOfBorn"
                v-model="data.formData.dateOfBorn"
                type="date"
                class="input-field"
              />
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div>
              <label for="email" class="block text-gray-700 font-medium"
                >Email</label
              >
              <input
                id="email"
                v-model="data.formData.email"
                type="email"
                class="input-field"
              />
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div class="md:col-span-2">
              <label for="description" class="block text-gray-700 font-medium"
                >Deskripsi</label
              >
              <textarea
                v-model="data.formData.description"
                class="input-field"
                placeholder="Write a comment..."
                id="description"
              ></textarea>
              <LabelError
                v-if="data.errors.length > 0"
                :errors="data.errors"
                propName="Description"
              ></LabelError>
            </div>
            <div class="md:col-span-2 flex justify-center">
              <button
                type="submit"
                class="bg-emerald-500 text-white px-6 py-2 rounded-lg shadow hover:bg-emerald-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
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
