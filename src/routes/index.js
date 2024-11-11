import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/Daftar-guru",
    name: "Daftar-guru",
    component: () => import("../views/guru/daftarHadirGuru.vue"),
  },
  {
    path: "/Guru",
    name: "Guru",
    component: () => import("../views/guru/guru.vue"),
  },
  {
    path: "/Siswa",
    name: "Siswa",
    component: () => import("../views/siswa/siswa.vue"),
  },
  {
    path: "/Tahun-ajaran",
    name: "Tahun-ajaran",
    component: () => import("../views/shcoolyear/tahunAjaran.vue"),
  },

  {
    path: "/History",
    name: "History",
    component: () => import("../views/history/history.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },

  // routes tahun ajaran
  {
    path: "/Tahun-ajaran/add",
    name: "addShoolyear",
    component: () => import("../views/shcoolyear/addTahunAjaran.vue"),
  },
  {
    path: "/Tahun-ajaran/:id/edit",
    name: "editSchoolyear",
    component: () => import("../views/shcoolyear/editTahunAjaran.vue"),
    // beforeEnter: (to, from, next) => {
    //     const token = localStorage.getItem('auth_token');
    //     if (token) {
    //       next(); // Jika token ada, lanjutkan ke halaman
    //     } else {
    //       next('/login'); // Jika token tidak ada, arahkan ke halaman login
    //     }
    //   }
  },

  // Jurusan
  {
    path: "/Jurusan",
    name: "Jurusan",
    component: () => import("../views/jurusan/jurusan.vue"),
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
