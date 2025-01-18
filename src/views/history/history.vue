<script setup>
import AdminPage from "../../components/AdminPage.vue";




</script>

<template>
  <AdminPage>
    <div class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <div class="test">
          <h1>Test SASS</h1>
          <div class="apalah">Hello</div>
        </div>
      </div>
    </div>
  </AdminPage>
</template>

<style lang="scss" scoped>
.test {
  padding: 30px;
  color: red;
  .apalah  {
    color: blue;
  }
}
</style>