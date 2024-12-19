<script setup>
import  AdminPage  from '../../components/AdminPage.vue'
</script>

<template>
  <AdminPage>
    <div class="hero min-h-screen">
      <div class="hero-overlay bg-white"></div>
      <div class="hero-content text-black text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello there 😊</h1>
          <p class="mb-5">Welcome to page Picket SMK Negeri 8 Tik Jayapura..</p>
          <div class="text-center mt-8">
            <a href="#"
              class="inline-block px-6 py-3 mt-6 text-white transition bg-emerald-400 hover:bg-emerald-500 rounded hover:shadow focus:outline-none focus:ring">
              <div class="flex">
                <span class="text-sm font-semibold"> Tentang Kami</span>

                <svg class="ml-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </AdminPage>
</template>
