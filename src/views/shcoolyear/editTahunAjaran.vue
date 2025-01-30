<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SchoolYearService } from "../../services/SchoolYearService";
import AdminPage from "../../components/AdminPage.vue";
import { ToastService } from "../../services/ToastService";

const data = reactive({
  form: { year: null, semester: null, actived: true },
});
const router = useRouter();
const route = useRoute();

const schoolYearId = route.params.id;
try {
  const schoolYearId = route.params.id;
  SchoolYearService.getById(schoolYearId).then((response) => {
    if (response.isSuccess) {
      data.form = response.data;
    }
  });
} catch (error) {
  console.error("Error fetching schoolYear data:", error.message);
}

const updateSchoolYear = async () => {
  try {
    const response = await SchoolYearService.put(schoolYearId, data.form);
    if (response.isSuccess) {
      ToastService.successToast("Data berhasil disimpan.", "success");
      router.push({ path: "/Tahun-ajaran" });
    } else {
      console.log("API Error Response:", response.errors);
      data.errors = response.errors;
      ToastService.dangerToast(Helper.readError(data.errors, "Message"), "error");
    }
  } catch (error) {
    console.error("Error saving teacher data:", error);
    alert("Terjadi kesalahan saat menyimpan data.");
  }
};
</script>

<template>
  <admin-page>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="text-2xl font-semibold mb-6">Edit Tahun Ajaran</h2>

        <form @submit.prevent="updateSchoolYear">
          <!-- Input Tahun -->
          <div class="mb-5">
            <label for="yearpicker" class="block mb-2 text-sm font-medium">Year</label>
            <input v-model="data.form.year" id="yearpicker" type="number" min="1900" max="2100" step="1"
              class="bg-gray-50 border text-gray-900 rounded-lg focus:ring focus:border block w-full p-2.5"
              placeholder="Masukkan Tahun" required />
          </div>

          <!-- Input Semester -->
          <div class="mb-5">
            <label for="semester" class="block text-sm font-medium">Semester</label>
            <input v-model="data.form.semester" id="semester" type="number" min="1" max="2"
              class="bg-gray-50 border text-gray-900 rounded-lg focus:ring focus:border block w-full p-2.5"
              placeholder="Masukkan Semester (1 atau 2)" required />
          </div>

          <!-- Status Aktif -->
          <div class="mb-5">
            <label for="active" class="block mb-2 text-sm font-medium">Active</label>
            <select v-model="data.form.actived" id="active"
              class="bg-gray-50 border text-gray-900 rounded-lg focus:ring focus:border block w-full p-2.5" required>
              <option :value="true">True</option>
              <option :value="false">False</option>
            </select>
          </div>

          <!-- Tombol Update -->
          <button type="submit"
            class="flex justify-center items-center m-auto w-full text-white bg-green-700 hover:bg-green-800 focus:ring focus:ring-green-300 rounded-lg px-5 py-2.5">
            Simpan Perubahan
          </button>
        </form>

      </div>
    </div>
  </admin-page>
</template>
