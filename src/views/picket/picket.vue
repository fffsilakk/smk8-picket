<template>
  <AdminPage>
    <div v-if="systemMessage">
      <div class="alert alert-warning">
        {{ systemMessage }}
      </div>

    </div>

    <div class=" space-y-3  p-4 rounded-lg shadow-md">
      <div class="flex">
        <label class="labelTitle">Tanggal</label>
        <label class="labelValue">: </label>
      </div>
      <div class="flex">
        <label class="labelTitle">Cuaca</label>
        <label class="labelValue">: </label>
      </div>
      <div class="flex">
        <label class="labelTitle">Jumlah Guru</label>
        <label class="labelValue">: </label>
      </div>
      <div class="flex">
        <label class="labelTitle">Jumlah Siswa</label>
        <label class="labelValue">: </label>
      </div>
      <div class="flex">
        <label class="labelTitle">Picket Dibuka oleh</label>
        <label class="labelValue">: </label>
      </div>
    </div>

   <div class="mt-10">
    <fwb-tabs v-model="activeTab" class="p-5">
      <fwb-tab name="first" title="Catatan Kejadian">
        Catatan Kejadian
      </fwb-tab>
      <fwb-tab name="second" title="Siswa Terlambat">
        Siswa Terlambat
      </fwb-tab>
      <fwb-tab name="third" title="Siswa Pulang Lebih Cepat">
        Siswa Pulang Lebih Cepat
      </fwb-tab>
   
    </fwb-tabs>
   </div>

  </AdminPage>
</template>

<script setup>
import AdminPage from "@/components/AdminPage.vue";
import { PicketService } from "@/services/PicketService";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Helper } from "@/helper";
import { FwbTab, FwbTabs } from 'flowbite-vue'

const activeTab = ref('first')
const systemMessage = ref("");

onMounted(async () => {
  const response = await PicketService.get();
  if (response.status !== 200) {
    systemMessage.value = `Piket hari ini,  ${Helper.getIndonesiaDay(new Date().getDay())}, ${Helper.formatDate(new Date())} belum dibuka.`;
  }
});
</script>

<style lang="css" scoped>
.alert {
  padding: 1em;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
}

.labelTitle {
  margin-right: 10px;
  width: 150px;
}

.labelValue {
  font-weight: normal;
}
</style>