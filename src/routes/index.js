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
    path: "/Picket-guru",
    name: "Picket-guru",
    component: () => import("../views/guru/jadwalPicketGuru.vue"),
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
    path: "/History",
    name: "History",
    component: () => import("../views/history/history.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  // const auth = useAuthStore();
  const token = localStorage.getItem("authToken");
  if (!token && authRequired) {
    return "/login";
  }
});

export default router;
