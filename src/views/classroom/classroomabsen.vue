<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import AdminPage from '../../components/AdminPage.vue'
import { ClassRoomService } from '../../services/ClassRoomService'
import { DepartmentService } from '../../services/DepartmentService'
import { StudentService } from '../../services/StudentService'
import { TeacherService } from '../../services/TeacherService'
import AutoComplete from "../../components/AutoComplete.vue";
import { ToastService } from "../../services/ToastService";
import { Helper } from "../../helper";
import LabelError from "@/components/LabelError.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import EditIcon from "@/components/Icons/EditIcon.vue";
import AddIcon from "@/components/Icons/AddIcon.vue";
import DetailIcon from "@/components/Icons/DetailIcon.vue";
import { DialogService } from "../../services/DialogService";


const data = reactive({ errors: [], ketuaText: '', waliText: '', teachers: [], students: [], departments: [] });

const classroom = ref({ students: [] });
const form = ref({});
const showModal = ref(false);
const router = useRouter();

const route = useRoute();

var classroomId = route.params.id;

try {
  ClassRoomService.getById(classroomId).then((response) => {
    classroom.value = response.data;
  });
} catch (error) {
  console.error("Error fetching data:", error.message);
}

const addClassroom = async () => {
  try {
    const requestBody = {
      id: form.value.id
    };

    if (form.value.id) {
      ClassRoomService.addStudentToClass(classroom.value.id, requestBody).then((response) => {
        if (response.isSuccess) {
          classroom.value.students.push(form.value.data);
          showModal.value = false;
          resetForm();
          ToastService.successToast("Data berhasil tambahkan");
        } else {
          data.errors = response.data.errors;
          ToastService.dangerToast(Helper.readDetailError(response.data));
        }
      });
    }

  } catch (error) {
    console.error(
      "Error adding student to classroom:",
      error.response?.data || error.message
    );
    alert("Failed  add student to classroom. Please check the input data.");
  }
};

// Function to reset the form
const resetForm = () => {
  form.value = {
    id: 0
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

const diSableButton = computed(() => {
  if (!form.value.id) {
    return true;
  }
  return false;
})
let selectedClassRoom = {};
const editClassroom = (classRoom) => {
  selectedClassRoom = classRoom;
  showModal.value = true;
  form.value.id = classRoom.id;
}


const confirmDelete = (student) => {
  DialogService.showDialog(
    `Apakah Anda yakin ingin menghapus siswa '${student.name}' dari kelas ?`,
    student,
    "warning",
    3000,
    "Batal",
    "Hapus"
  ).then((result) => {
    deleteData(result);
  });
};

const deleteData = async (student) => {
  if (student) {
    try {
      const response = await ClassRoomService.removeStudent(classroom.value.id, student.id);
      if (response.isSuccess) {
        ToastService.successToast("Data berhasil dihapus.");
        let index = classroom.value.students.indexOf(student);
        classroom.value.students.splice(index, 1);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      data.showDeleteModal = false;
    }
  }
};

</script>
<style scoped>
.labelTitle {
  margin-right: 10px;
  width: 125px;
}

.labelValue {
  font-weight: normal;
}
</style>

<template>
  <AdminPage>
    <div class="">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">DATA ABSEN</h1>
      </div>
      <div class="flex gap-4 bg-white p-4 rounded-lg shadow-md">
        <div>
          <div class="flex">
            <label class="labelTitle">Nama Kelas</label>
            <label for="className" class="labelValue">: {{ classroom.className }}-{{ classroom.departmentInitial
              }}</label>
          </div>
          <div class="flex">
            <label class="labelTitle">Nama Kelas</label>
            <label for="className" class="labelValue">: {{ classroom.departmentName }}</label>
          </div>
          <div class="flex">
            <label class="labelTitle">Wali Kelas</label>
            <label for="className" class="labelValue">: {{ classroom.homeRoomTeacherName }}</label>
          </div>
          <div class="flex">
            <label class="labelTitle">Ketua Kelas</label>
            <label for="className" class="labelValue">: {{ classroom.classLeaderName }}</label>
          </div>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3">No</th>
              <th class="px-6 py-3">NIS / NISN</th>
              <th class="px-6 py-3">Nama Siswa</th>
              <th class="px-6 py-3">Jenis Kelamin</th>
              <th class="px-6 py-3">TTL</th>
              <th class="w-12 px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in classroom.students.sort((a, b) => a.name - b.name)" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                {{ student.nis }} <span v-if="student.nisn">/{{ student.nisn }}</span>
              </td>
              <td class="px-6 py-4">{{ student.name }}</td>
              <td class="px-6 py-4">{{ student.jeniskelamin }}</td>
              <td class="px-6 py-4">{{ student.ttl }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </AdminPage>
</template>
