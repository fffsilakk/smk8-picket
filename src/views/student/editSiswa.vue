<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StudentService } from "../../services/StudentService";
import AdminPage from "../../components/AdminPage.vue";
import { ToastService } from "../../services/ToastService";

const data = reactive({
  form: {
    nis: null,
    nisn: null,
    name: "",
    gender: 0,
    placeOfBorn: "",
    dateOfBorn: { year: 0, month: 0, day: 0, dayOfWeek: 0 },
    email: "",
    description: "",
    userId: "",
  },
});
const router = useRouter();
const route = useRoute();

const studentId = route.params.id;
try {
  const studentId = route.params.id;
  StudentService.getById(studentId).then((response) => {
    if (response.isSuccess) {
      data.form = response.data;
    }
  });
} catch (error) {
  console.error("Error fetching department data:", error.message);
}

// Fungsi untuk memperbarui siswa
const updateStudent = async () => {
  try {
    const response = await StudentService.put(studentId, data.form);
    if (response.isSuccess) {
      ToastService.addToast("Data berhasil disimpan.", "success");
      router.push({ path: "/Siswa" });
    } else {
      console.log("API Error Response:", response.errors);
      data.errors = response.errors;
      ToastService.addToast(Helper.readError(data.errors, "Message"), "error");
    }
  } catch (error) {
    console.error("Error saving teacher data:", error);
    alert("Terjadi kesalahan saat menyimpan data.");
  }
};
</script>

<template>
  <AdminPage>
    <div
      class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 ml-20 flex flex-col"
    >
      <h2 class="text-xl font-semibold mb-5">Edit Data Siswa</h2>

      <form @submit.prevent="updateStudent">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="number"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nis</label
            >
            <input
              type="text"
              id="number"
              v-model="data.form.nis"
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
              v-model="data.form.name"
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
              v-model="data.form.gender"
              class="input-field"
              required
            >
              <option value="0">Perempuan</option>
              <option value="1">Laki-laki</option>
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
              v-model="data.form.placeOfBorn"
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
              v-model="data.form.dateOfBorn"
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
              v-model="data.form.email"
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
              v-model="data.form.description"
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
              v-model="data.form.userId"
              class="input-field"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="bg-slate-900 text-white py-2 px-4 rounded hover:bg-emerald-500"
        >
          Update Siswa
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
