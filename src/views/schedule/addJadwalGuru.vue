<!-- <template>
  <div class="container mx-auto px-4 py-6">
    <h2 class="text-2xl font-semibold mb-4">Tambah Jadwal Guru</h2>

    <!-- Form untuk menambahkan jadwal guru -->
    <form @submit.prevent="addData" class="space-y-4">
      <div>
        <label for="teacherName" class="block text-sm font-medium text-gray-700"
          >Nama Guru</label
        >
        <input
          v-model="formData.teacherName"
          type="text"
          id="teacherName"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Masukkan nama guru"
        />
      </div>

      <div>
        <label
          for="teacherNumber"
          class="block text-sm font-medium text-gray-700"
          >Teacher Number</label
        >
        <input
          v-model="formData.teacherNumber"
          type="text"
          id="teacherNumber"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Masukkan nomor guru"
        />
      </div>

      <div>
        <label for="photo" class="block text-sm font-medium text-gray-700"
          >Photo</label
        >
        <input
          v-model="formData.photo"
          type="text"
          id="photo"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Masukkan URL foto"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Tambah Jadwal
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      formData: {
        teacherNumber: "",
        teacherName: "",
        photo: "",
      },
    };
  },
  setup() {
    const router = useRouter(); // Gunakan router instance
    return { router };
  },
  methods: {
    async addData() {
      try {
        const token = `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmZmRiMDY2LWY1MmQtNGE3Ny05YTgxLWVjNzk1NjFhOTFjMCIsIm5hbWUiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJzdWIiOiJhZG1pbkBwaWNrZXQub2NwaDIzLnRlY2giLCJlbWFpbCI6ImFkbWluQHBpY2tldC5vY3BoMjMudGVjaCIsImp0aSI6ImJlM2VlMTY3LWZhNTAtNDljZi1iY2M0LTg2NDZiZjdjOWIwMyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTczMjk0NTMxNiwiZXhwIjoxNzMzNTUwMTE2LCJpYXQiOjE3MzI5NDUzMTYsImlzcyI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyIsImF1ZCI6Imh0dHBzOi8vcGlja2V0Lm9jcGgyMy50ZWNoLyJ9.02z3z6HXHNM1NwItAcPAsua7pWBTNY5AvUsDGRLXUEQK2nMkTeg-RGddSJ-zTI0jC1I6stdlMCk5pj3yPoTk7Q`; // Ganti dengan token yang benar
        const response = await axios.post(
          "https://picket.ocph23.tech/api/schedule",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        console.log("Data berhasil ditambahkan:", response.data);
        this.resetForm();
        this.$router.push({ path: "/Tahun-ajaran" }); // Navigasi ke halaman tahun ajaran
      } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan data:", error);
        if (error.response) {
          console.error("Error detail:", error.response.data);
        }
      }
    },
    resetForm() {
      this.formData = {
        teacherNumber: "",
        teacherName: "",
        photo: "",
      };
    },
  },
};
</script>

<style scoped>
/* Gaya untuk form dan tombol */
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style> -->
