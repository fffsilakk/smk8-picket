<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AdminPage from '../../components/AdminPage.vue'
import { ClassRoomService } from '../../services/ClassRoomService'
import { DepartmentService } from '../../services/DepartmentService'
import { StudentService } from '../../services/StudentService'
import { TeacherService } from '../../services/TeacherService'
import AutoComplete from "../../components/AutoComplete.vue";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import DeleteIcon from "../../components/Icons/DeleteIcon.vue";
import EditIcon from "../../components/Icons/EditIcon.vue";


const classrooms = ref([]);
const form = ref({
  className: "",
  departmentName: "",
  departmentInitial: "",
  classLeaderName: "",
  homeRoomTeacherName: "",
  departmentId: 0,
  classLeaderId: 0,
  homeRoomTeacherId: 0,
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
      departmentId: form.value.departmentId,
      classRommLeaderId: form.value.classLeaderId,
      homeRoomTeacherId: form.value.homeRoomTeacherId,
    };

    if (!form.value.id) {
      ClassRoomService.post(requestBody).then((response) => {
        if (response.isSuccess) {
          classrooms.value.push(response.data);
          showModal.value = false;
          resetForm();
          ToastService.successToast("Data berhasil tambahkan");
        } else {
          ToastService.dangerToast(Helper.readDetailError(response.data));
        }
      });
    } else {
      ClassRoomService.put(requestBody.id, requestBody).then((response) => {
        if (response.isSuccess) {
          showModal.value = false;
          selectedClassRoom.className = form.value.className;
          selectedClassRoom.departmentName = form.value.departmentName;
          selectedClassRoom.departmentInitial = form.value.departmentInitial;
          selectedClassRoom.departmentId = form.value.departmentId;
          selectedClassRoom.classLeaderId = form.value.classLeaderId;
          selectedClassRoom.homeRoomTeacherId = form.value.homeRoomTeacherId;
          ToastService.successToast("Data berhasil diubah");
          resetForm();
        } else {
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
    classLeaderId: 0,
    homeRoomTeacherId: 0,
  };
};

const data = reactive({ ketuaText: '', waliText: '', teachers: [], students: [], departments: [] });

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
  if (!form.value.className || !form.value.departmentId || !form.value.classLeaderId || !form.value.homeRoomTeacherId) {
    return true;
  }
  return false;
})
let selectedClassRoom={};
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
    <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col">
      <button @click="showModal = true" class="transition rounded text-black my-3 w-6 items-center text-center">
        <svg class="w-8 h-8 dark:text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
            clip-rule="evenodd" />
        </svg>
      </button>

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
              <label class="label">Inisial Jurusan</label>
              <input v-model="form.departmentInitial" class="input input-bordered" type="text" required />
            </div>
            <div class="form-control">
              <label class="label">Nama Jurusan</label>
              <select v-model="form.departmentId" class="input input-bordered" required>
                <option class="text-slate-300">Pilih Ketua Kelas</option>
                <option v-for="department in data.departments" :value="department.id">
                  {{ department.name }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">Ketua Kelas</label>
              <AutoComplete :service="StudentService" :query="form.classLeaderName" v-model="form.classLeaderId">
              </AutoComplete>
            </div>

            <div class="form-control">
              <label class="label">Wali Kelas</label>
              <AutoComplete :service="TeacherService" :query="form.homeRoomTeacherName"
                v-model="form.homeRoomTeacherId"></AutoComplete>
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
              <th class="px-6 py-3">Nama Jurusan</th>
              <th class="px-6 py-3">Ketua Kelas</th>
              <th class="px-6 py-3">Wali Kelas</th>
              <th class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(classroom, index) in classrooms" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                {{ classroom.className }}-{{ classroom.departmentInitial }}
              </td>
              <td class="px-6 py-4">{{ classroom.departmentName }}</td>
              <td class="px-6 py-4">{{ classroom.classLeaderName }}</td>
              <td class="px-6 py-4">{{ classroom.homeRoomTeacherName }}</td>
              <td class="px-6 py-4 flex gap-2 items-center justify-start">
                <button @click="editClassroom(classroom)"
                  class="text-black rounded-lg hover:text-slate-500 transition-all duration-200">
                  <EditIcon></EditIcon>
                </button>
                <button @click="deleteData(classroom.id)"
                  class="transition-all duration-200 text-red-500 hover:text-red-700 rounded-lg">
                  <DeleteIcon></DeleteIcon>

                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </AdminPage>
</template>
