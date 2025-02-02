<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from '@/components/AdminPage.vue'
import { ClassRoomService } from '../../services/ClassRoomService'
import { DepartmentService } from '../../services/DepartmentService'
import { StudentService } from '../../services/StudentService'
import { TeacherService } from '../../services/TeacherService'
import AutoComplete from "@/components/AutoComplete.vue";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import DeleteIcon from "@/components/customeicons/DeleteIcon.vue";
import EditIcon from "@/components/customeicons/EditIcon.vue";
import LabelError from "@/components/LabelError.vue";
import AddIcon from "@/components/customeicons/AddIcon.vue";
import DetailIcon from "@/components/customeicons/DetailIcon.vue";

const data = reactive({ errors: [], ketuaText: '', waliText: '', teachers: [], students: [], departments: [] });

const classrooms = ref([]);
const form = ref({
  className: "",
  departmentName: "",
  departmentInitial: "",
  classLeaderName: "",
  homeRoomTeacherName: "",
  level: 1,
  departmentId: 0,
  classLeader: {},
  homeRoomTeacher: {},
});
const showModal = ref(false);
const router = useRouter();

try {

  ClassRoomService.get().then((response) => {
    classrooms.value = response.data;
  });

  DepartmentService.get().then((response) => {
    data.departments = response.data;
  });


} catch (error) {
  console.error("Error fetching data:", error.message);
}

const addClassroom = async () => {
  try {
    const requestBody = {
      id: form.value.id,
      name: form.value.className,
      level: form.value.level,
      departmentId: form.value.departmentId,
      ClassRommLeaderId: form.value.classLeader.id,
      homeRoomTeacherId: form.value.homeRoomTeacher.id,
    };

    if (!form.value.id) {
      ClassRoomService.post(requestBody).then((response) => {
        if (response.isSuccess) {
          classrooms.value.push(response.data);
          showModal.value = false;
          resetForm();
          ToastService.successToast("Data berhasil tambahkan");
        } else {
          data.errors = response.data.errors;
          ToastService.dangerToast(Helper.readDetailError(response.data));
        }
      });
    } else {
      ClassRoomService.put(requestBody.id, requestBody).then((response) => {
        if (response.isSuccess) {
          showModal.value = false;
          selectedClassRoom.className = form.value.className;
          selectedClassRoom.level = form.value.level;
          selectedClassRoom.departmentName = form.value.departmentName;
          selectedClassRoom.departmentInitial = form.value.departmentInitial;
          selectedClassRoom.departmentId = form.value.departmentId;
          selectedClassRoom.classLeaderId = form.value.classLeader.id;
          selectedClassRoom.homeRoomTeacherId = form.value.homeRoomTeacher.id;
          ToastService.successToast("Data berhasil diubah");
          resetForm();
        } else {
          data.errors = response.data.errors;
          ToastService.dangerToast(Helper.readDetailError(response.data));
        }
      });
    }


  } catch (error) {
    console.error(
      "Error adding classroom:",
      error.response?.data || error.message
    );
    alert("Failed to add classroom. Please check the input data.");
  }
};

// Function to reset the form
const resetForm = () => {
  form.value = {
    id: 0,
    className: "",
    departmentName: "",
    departmentInitial: "",
    classLeaderName: "",
    homeRoomTeacherName: "",
    name: "string",
    departmentId: 0,
    classLeader: {},
    homeRoomTeacher: {}
  };
};

function ketuaKelasOnchange(tes) {
  data.ketuaText = tes.target.value;
}

function waliKelasOnchange(tes) {
  data.waliText = tes.target.value;
}


function searchKetua() {
  StudentService.search(data.ketuaText).then(response => {
    data.students = response.data.map((item) => {
      return { id: item.id, name: item.name }
    });
  })
}

function searchWali() {
  TeacherService.search(data.waliText).then(response => {
    data.teachers = response.data;
  })
}


const diSableButton = computed(() => {
  if (!form.value.className || !form.value.departmentId || !form.value.classLeader.id || !form.value.homeRoomTeacher.id) {
    return true;
  }
  return false;
})
let selectedClassRoom = {};
const editClassroom = (classRoom) => {
  selectedClassRoom = classRoom;
  showModal.value = true;
  form.value.id = classRoom.id;
  form.value.className = classRoom.className;
  form.value.departmentInitial = classRoom.departmentInitial;
  form.value.departmentId = classRoom.departmentId;
  form.value.classLeaderName = classRoom.classLeaderName;
  form.value.homeRoomTeacherName = classRoom.homeRoomTeacherName;
  form.value.classLeaderId = classRoom.classLeaderId;
  form.value.homeRoomTeacherId = classRoom.homeRoomTeacherId;
}

</script>

<template>
  <AdminPage>
    <div class="">


      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Data Kelas</h1>
        <button @click="showModal = true" class="transition rounded text-black my-3 w-6 items-center text-center">
          <AddIcon />
        </button>
      </div>

      <!-- Modal -->
      <div v-if="showModal" class="modal modal-open">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Tambah Kelas</h3>
          <form @submit.prevent="addClassroom">
            <div class="form-control">
              <label class="label">Nama Kelas</label>
              <input v-model="form.className" class="input input-bordered" type="text" required />
            </div>
            <div class="form-control">
              <label class="label">Tingkat</label>
              <input v-model="form.level" class="input input-bordered" type="number" min="1" max="3" required />
              <LabelError v-if="data.errors.length > 0" :errors="data.errors" propName="Level" />
            </div>
            <div class="form-control">
              <label class="label">Jurusan</label>
              <select v-model="form.departmentId" class="input input-bordered" required>
                <option class="text-slate-300">Pilih Ketua Kelas</option>
                <option v-for="department in data.departments" :value="department.id">
                  {{ department.name }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">Ketua Kelas</label>
              <AutoComplete :service="StudentService" :query="form.classLeaderName" v-model="form.classLeader">
              </AutoComplete>
            </div>

            <div class="form-control">
              <label class="label">Wali Kelas</label>
              <AutoComplete :service="TeacherService" :query="form.homeRoomTeacherName" v-model="form.homeRoomTeacher">
              </AutoComplete>
            </div>

            <div class="modal-action">
              <button :disabled="diSableButton" type="submit" class="btn btn-primary">Save</button>
              <button type="button" @click="showModal = false" class="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Classroom Table -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">No</th>
              <th class="px-6 py-3">Nama Kelas</th>
              <th class="px-6 py-3">Tingkat</th>
              <th class="px-6 py-3">Nama Jurusan</th>
              <th class="px-6 py-3">Ketua Kelas</th>
              <th class="px-6 py-3">Wali Kelas</th>
              <th class="px-6 py-3">TA</th>
              <th class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(classroom, index) in classrooms.sort((a, b) => a.level - b.level)" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                {{ classroom.className }}-{{ classroom.departmentInitial }}
              </td>
              <td class="px-6 py-4">{{ classroom.level }}</td>
              <td class="px-6 py-4">{{ classroom.departmentName }}</td>
              <td class="px-6 py-4">{{ classroom.classLeaderName }}</td>
              <td class="px-6 py-4">{{ classroom.homeRoomTeacherName }}</td>
              <td class="px-6 py-4">{{ classroom.year }}/{{ classroom.year + 1 }}</td>
              <td class="px-6 py-4 flex gap-2 items-center justify-start">
                <button @click="editClassroom(classroom)"
                  class="text-black rounded-lg hover:text-slate-500 transition-all duration-200">
                  <EditIcon></EditIcon>
                </button>
                <button @click="deleteData(classroom.id)"
                  class="transition-all duration-200 text-red-500 hover:text-red-700 rounded-lg">
                  <DeleteIcon></DeleteIcon>
                </button>
                <router-link :to="`/classroom/${classroom.id}`">
                  <DetailIcon />
                </router-link>
                <router-link :to="`/classroom/absen/${classroom.id}`">
                  <DetailIcon />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </AdminPage>
</template>
