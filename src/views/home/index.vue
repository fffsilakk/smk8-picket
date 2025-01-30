<script setup>
import AdminPage from '../../components/AdminPage.vue'
import { ref } from 'vue'

let year = ref(new Date().getFullYear())

</script>

<template>
  <AdminPage>
    <div class="h-screen flex justify-center flex-col items-center">
      <img class="m-12" width="15%" src="../../../public/smk.png" alt="">
      <p class="text-lg">SELAMAT DATANG DI SMKN 8 TIK KOTA JAYAPURA</p>
      <p class="text-lg">KOTA JAYAPURA</p>
      <p class="text-lg">{{ year }}</p>
    </div>
  </AdminPage>
</template>
