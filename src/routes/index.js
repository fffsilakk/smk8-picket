import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/History",
    name: "History",
    component: () => import("../views/history/history.vue"),
  },

  // routes tahun ajaran
  {
    path: "/Tahun-ajaran",
    name: "Tahun-ajaran",
    component: () => import("../views/shcoolyear/tahunAjaran.vue"),
  },
  {
    path: "/Tahun-ajaran/add",
    name: "addShoolyear",
    component: () => import("../views/shcoolyear/addTahunAjaran.vue"),
  },
  {
    path: "/Tahun-ajaran/:id/edit",
    name: "editSchoolyear",
    component: () => import("../views/shcoolyear/editTahunAjaran.vue"),
  },

  //routes Departmen
  {
    path: "/Jurusan",
    name: "Jurusan",
    component: () => import("../views/jurusan/jurusan.vue"),
  },
  {
    path: "/Jurusan/add",
    name: "addJurusan",
    component: () => import("../views/jurusan/addJurusan.vue"),
  },
  {
    path: "/Jurusan/:id/edit",
    name: "editJurusan",
    component: () => import("../views/jurusan/editJurusan.vue"),
  },

  // routes student
  {
    path: "/Siswa",
    name: "Siswa",
    component: () => import("../views/student/siswa.vue"),
  },
  {
    path: "/Siswa/add",
    name: "addSiswa",
    component: () => import("../views/student/addSiswa.vue"),
  },
  {
    path: "/Siswa/:id/edit",
    name: "editSiswa",
    component: () => import("../views/student/editSiswa.vue"),
  },

  // routes Teacher
  {
    path: "/Guru",
    name: "Guru",
    component: () => import("../views/teacher/guru.vue"),
  },
  {
    path: "/Guru/add",
    name: "addGuru",
    component: () => import("../views/teacher/addGuru.vue"),
  },
  {
    path: "/Guru/:id/edit",
    name: "editGuru",
    component: () => import("../views/teacher/editGuru.vue"),
  },

  // routes schedule
  {
    path: "/Jadwal/:id",
    name: "Jadwal",
    component: () => import("../views/schedule/jadwal.vue"),
  },

  

  // routes Picket
  {
    path: "/Picket",
    name: "Picket",
    component: () => import("../views/picket/picket.vue"),
  },
 

  // routes Classrom
  {
    path: "/Classroom",
    name: "classroom",
    component: () => import("../views/classroom/classroom.vue"),
  },
  {
    path: "/classroom/:id",
    name: "classroomdetail",
    component: () => import("../views/classroom/classroomdetail.vue"),
  },
  {
    path: "/classroom/absen/:id",
    name: "classroomabsen",
    component: () => import("../views/classroom/classroomabsen.vue"),
  },
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem("authToken");
  if (!token && authRequired) {
    return "/login";
  }
});

export default router;
