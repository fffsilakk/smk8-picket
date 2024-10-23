//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
  },
  {
    path: "/Daftar-guru",
    name: "Daftar-guru",
    component: () =>
      import(
        /* webpackChunkName: "index" */ "../views/guru/daftarHadirGuru.vue"
      ),
  },
  {
    path: "/Picket-guru",
    name: "Picket-guru",
    component: () =>
      import(
        /* webpackChunkName: "index" */ "../views/guru/jadwalPicketGuru.vue"
      ),
  },
  {
    path: "/Guru",
    name: "Guru",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/guru/guru.vue"),
  },
  {
    path: "/Siswa",
    name: "Siswa",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/siswa/siswa.vue"),
  },
  {
    path: "/History",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/history/history.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/auth/register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/auth/login.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
