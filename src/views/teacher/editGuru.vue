<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TeacherService } from "../../services/TeacherService";
import AdminPage from "@/components/AdminPage.vue";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";

const data = reactive({
  form: {
    registerNumber: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  },
});
const imageSrc = ref("");

const router = useRouter();
const route = useRoute();
const teacherId = route.params.id;

try {
  const teacherId = route.params.id;
  TeacherService.getById(teacherId).then((response) => {
    if (response.isSuccess) {
      data.form = response.data;
      imageSrc.value = Helper.getTeacherAvatar(response.data.photo)
    }
  });
} catch (error) {
  console.error("Error fetching department data:", error.message);
}

const updateTeacher = async () => {
  try {
    const response = await TeacherService.put(teacherId, data.form);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil disimpan.");
      router.push({ path: "/Guru" });
    } else {
      console.log("API Error Response:", response.errors);
      data.errors = response.errors;
      ToastService.dangerToast(Helper.readError(data.errors, "Message"));
    }
  } catch (error) {
    ToastService.dangerToast("Terjadi kesalahan saat menyimpan data.");
  }
};



const changePhoto = async () => {
  var fileInput = document.getElementById("file");
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    Helper.fileToBase64(file).then(async (base64) => {
      imageSrc.value = 'data:image/png;base64,' + base64;
      var response = await TeacherService.updateFoto(data.form.id, base64);
      if (response.isSuccess) {
        ToastService.successToast("Photo berhasil diganti !")
      } else {
        ToastService.dangerToast(response.data.detail);
      }
    });
  });
  fileInput.click();
}
</script>

<template>
  <AdminPage>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-xl font-semibold mb-5">Edit Data Guru</h1>

      <div class="w-full flex justify-center mb-6">
        <input type="file" name="file" id="file" hidden>
        <img @click="changePhoto" class="w-32 h-32 rounded-full cursor-pointer" :src="imageSrc">
      </div>

      <form @submit.prevent="updateTeacher">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor
              register</label>
            <input type="text" id="number" v-model="data.form.registerNumber" class="input-field" required />
          </div>

          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
            <input type="text" id="name" v-model="data.form.name" class="input-field" required />
          </div>

          <div>
            <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis
              Kelamin</label>
            <select id="gender" v-model="data.form.gender" class="input-field" required>
              <option value="1">Perempuan</option>
              <option value="0">Laki-laki</option>
            </select>
          </div>

          <div>
            <label for="placeOfBorn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat
              Lahir</label>
            <input type="text" id="placeOfBorn" v-model="data.form.placeOfBorn" class="input-field" required />
          </div>

          <div>
            <label for="dateOfBorn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
              Lahir</label>
            <input type="date" id="dateOfBorn" v-model="data.form.dateOfBorn" class="input-field" required />
          </div>

          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" v-model="data.form.email" class="input-field" required />
          </div>

          <div>
            <label for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
            <textarea id="description" v-model="data.form.description" class="input-field" rows="4"></textarea>
          </div>
        </div>

        <button type="submit" class="bg-slate-900 text-white py-2 px-4 rounded hover:bg-emerald-500">
          Simpan Perubahan
        </button>
      </form>
    </div>
  </AdminPage>
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
