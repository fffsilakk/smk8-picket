<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

const scheduleId = route.params.id;
const schedules = ref([]);
const teachers = ref([]);
const form = ref({
  schoolYearId: "",
  year: "",
  dayOfWeek: "",
  teacherId: "",
  teacherName: "",
  photo: "",
  teacherNumber: "",
});
const router = useRouter();

const auth = JSON.parse(localStorage.getItem("authToken"));
const authToken = "Bearer " + auth.token;
const data = reactive({ tahunAjara: 0, teachersNotHaveSchedule: [] });

const dayOfWeeks = [
  { day: 1, name: "Monday", title: "Senin" },
  { day: 2, name: "Tuesday", title: "Selasa" },
  { day: 3, name: "Wednesday", title: "Rabu" },
  { day: 4, name: "Thursday", title: "Kamis" },
  { day: 5, name: "Friday", title: "Jumat" },
  { day: 6, name: "Saturday", title: "Sabtu" },
];

// Fungsi untuk mengambil data (GET)
const getData = async () => {
  try {
    const response = await axios.get(
      `https://picket.ocph23.tech/api/schedule/byschoolyearId/${scheduleId}`,
      {
        headers: { Authorization: authToken },
      }
    );
    var firstSchedule = response.data[0];
    if (firstSchedule) {
      data.tahunAjara = firstSchedule.year;
    }

    schedules.value = Object.groupBy(
      response.data,
      ({ dayOfWeek }) => dayOfWeek
    );
    try {
      const response = await axios.get(
        "https://picket.ocph23.tech/api/teacher",
        {
          headers: { Authorization: authToken },
        }
      );
      teachers.value = response.data;
    } catch (error) {
      console.error("Error fetching student data:", error.message);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const resetForm = () => {
  form.value = {
    schoolYearId: "",
    year: "",
    dayOfWeek: "",
    teacherId: "",
    teacherName: "",
    photo: "",
    teacherNumber: "",
    // guru
  };
};

onMounted(() => getData());

const addTeacherToSchool = (teacher) => {
  model.teacherId = teacher.id;
  console.log(model);
  axios
    .post("https://picket.ocph23.tech/api/schedule", model, {
      headers: { Authorization: authToken },
    })
    .then((response) => {
      console.log("Success:", response);
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    });
};

//
const model = reactive({
  dayOfWeek: 0,
  teacherId: 0,
  teacherName: "",
});
const showModal = (dayOfWeek) => {
  data.teachersNotHaveSchedule = [];
  model.dayOfWeek = dayOfWeek;
  const modal = document.getElementById("my_modal_1");
  const teacherExists = [];

  const items = JSON.parse(JSON.stringify(schedules.value));
  dayOfWeeks.forEach((s) => {
    const datas = schedules.value[s.name];
    if (datas) {
      datas.forEach((element) => {
        teacherExists.push(element);
      });
    }
  });

  console.log(teacherExists);
  data.teachersNotHaveSchedule = teachers.value.filter((el) => {
    return !teacherExists.find((obj) => obj.teacherId === el.id);
  });
  setTimeout(() => {
    modal.showModal();
  }, 500);
};
</script>

<template>
  <div
    class="md:ml-64 sm:ml-64 mt-12 pt-10 p-6 md:px-10 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
  >
    <h2
      class="max-w-lg text-center mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
    >
      Jadwal Picket
      <span v-if="data.tahunAjara > 0" class="relative inline-block">
        {{ data.tahunAjara }}
        <div class="w-full h-3 -mt-3 bg-emerald-300"></div>
      </span>
    </h2>

    <div
      v-for="item in dayOfWeeks"
      class="grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-10"
    >
      <!-- Card senin  -->
      <div class="bg-white shadow-lg rounded-lg p-5 dark:bg-neutral-900">
        <div class="flex items-center gap-x-4 mb-3">
          <div
            class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800"
          >
            <svg
              class="w-6 h-6 text-blue-800 dark:text-blue-300 hover:animate-spin-on-hover"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
            <!--  -->

            <!--  -->
          </div>
          <div class="shrink-0">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ item.title }}
            </h3>
          </div>
          <!--  start jadwal -->

          <!-- close jadwal -->
          <!-- start modal  -->
          <div class="ml-auto">
            <button class="btn" @click="showModal(item.day)">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                />
              </svg>
            </button>
            <dialog
              id="my_modal_1"
              class="modal"
              v-if="data.teachersNotHaveSchedule"
            >
              <div class="modal-box">
                <h3 class="text-lg text-center pb-3 font-bold">
                  Daftar Guru Picket
                </h3>
                <table
                  class="overflow-x-auto min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">No</th>
                      <th scope="col" class="px-6 py-3">Name</th>
                      <th scope="col" class="px-6 py-3">Email</th>
                      <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-if="data.teachersNotHaveSchedule"
                      class="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      v-for="(teacher, index) in data.teachersNotHaveSchedule"
                      :key="index"
                    >
                      <td class="px-4 py-3">{{ index+1 }}</td>

                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img class="w-10 h-10 rounded-full" alt="" />
                        <div class="pl-3">
                          <div class="text-base font-medium">
                            {{ teacher.name }}
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4"></td>

                      <td class="px-6 py-4 flex gap-2">
                        <button
                          class="btn"
                          @click="addTeacherToSchool(teacher)"
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <!-- close modal  -->
        </div>

        <div class="overflow-x-auto grid">
          <table
            class="overflow-x-auto min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">No</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">No Guru</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                v-for="(schedule, index) in schedules[item.name]"
                :key="index"
              >
                <td class="px-4 py-3">{{ index + 1 }}</td>
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    :src="schedule.photo"
                    alt="Jese image"
                  />
                  <div class="pl-3">
                    <div class="text-base font-medium">
                      {{ schedule.teacherName }}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">{{ schedule.teacherId }}</td>
                <td class="px-6 py-4 flex gap-2">
                  <button
                    @click="updateData(schedule.id)"
                    class="text-emerald-500 rounded-lg hover:text-emerald-600 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="w-5 h-5"
                      fill="currentColor"
                    >
                      <path
                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteData(schedule.id)"
                    class="transition-all duration-200 text-red-500 hover:text-red-700 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      class="w-5 h-5"
                      fill="currentColor"
                    >
                      <path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
