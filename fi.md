<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// Routing
const router = useRouter();
const route = useRoute();
const scheduleId = route.params.id;

// Reactive Data
const schedules = ref([]);
const teachers = ref([]);
const form = reactive({
  schoolYearId: "",
  year: "",
  dayOfWeek: "",
  teacherId: "",
  teacherName: "",
  photo: "",
  teacherNumber: "",
});
const model = reactive({ dayOfWeek: 0, teacherId: 0 });

// Authorization
const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = `Bearer ${auth?.token}`;

// Get Data Functions
const fetchSchedules = async () => {
  try {
    const response = await axios.get(
      `https://picket.ocph23.tech/api/schedule/byschoolyearId/${scheduleId}`,
      {
        headers: { Authorization: authToken },
      }
    );
    schedules.value = response.data;
  } catch (error) {
    console.error("Error fetching schedules:", error.message);
  }
};

const fetchTeachers = async () => {
  try {
    const response = await axios.get("https://picket.ocph23.tech/api/teacher", {
      headers: { Authorization: authToken },
    });
    teachers.value = response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
  }
};

// Form Reset
const resetForm = () => {
  Object.assign(form, {
    schoolYearId: "",
    year: "",
    dayOfWeek: "",
    teacherId: "",
    teacherName: "",
    photo: "",
    teacherNumber: "",
  });
};

// Add Teacher to Schedule
const addTeacherToSchedule = async (teacher) => {
  try {
    const payload = {
      ...model,
      teacherId: teacher.teacherId,
    };
    await axios.post("https://picket.ocph23.tech/api/schedule", payload, {
      headers: { Authorization: authToken },
    });
    alert("Teacher successfully added!");
    fetchSchedules(); // Refresh data
  } catch (error) {
    console.error("Error adding teacher:", error.message);
  }
};

// Modal Logic
const showModal = (dayOfWeek) => {
  model.dayOfWeek = dayOfWeek;
  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

// Lifecycle
onMounted(() => {
  fetchSchedules();
  fetchTeachers();
});
</script>

<template>
  <div class="container mx-auto mt-10">
    <h2 class="text-center text-3xl font-bold mb-6">Jadwal Picket</h2>

    <div v-for="(schedule, index) in schedules" :key="index" class="mb-10">
      <h3 class="text-xl font-semibold mb-4">{{ schedule.year }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card shadow p-4 bg-white rounded-md">
          <div class="flex items-center">
            <div
              class="avatar w-14 h-14 bg-blue-500 text-white rounded-full flex justify-center items-center"
            >
              {{ schedule.dayOfWeek }}
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-semibold">{{ schedule.teacherName }}</h4>
              <p class="text-sm text-gray-500">ID: {{ schedule.teacherId }}</p>
            </div>
          </div>
          <div class="mt-4">
            <button
              class="btn btn-primary"
              @click="showModal(schedule.dayOfWeek)"
            >
              Tambah Guru
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold mb-4 text-center">Daftar Guru Picket</h3>
        <table class="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="border border-gray-300 px-4 py-2">No</th>
              <th class="border border-gray-300 px-4 py-2">Nama</th>
              <th class="border border-gray-300 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(teacher, index) in teachers"
              :key="teacher.teacherId"
              class="hover:bg-gray-100"
            >
              <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2">
                {{ teacher.name }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <button
                  class="btn btn-sm btn-success"
                  @click="addTeacherToSchedule(teacher)"
                >
                  Pilih
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="modal-action">
          <button
            class="btn btn-outline"
            @click="document.getElementById('my_modal_1').close()"
          >
            Tutup
          </button>
        </div>
      </div>
    </dialog>

  </div>
</template>

<style>
.container {
  max-width: 1200px;
  padding: 0 15px;
}
.card {
  background-color: #fff;
}
</style>
