<template>
  <AdminPage>
    <div v-if="systemMessage">
      <div class="alert alert-warning">
        <div>{{ systemMessage }}</div>
      </div>
      <div class="flex justify-center">
        <button @click="openPicket" class="w-1/2 btn-close text-white bg-orange-500 m-2 p-5 rounded-lg shadow-md"
          aria-label="Close">Buka
          Piket</button>
      </div>
    </div>

    <div v-if="data.picket">
      <div class=" space-y-3  p-4 rounded-lg shadow-md">
        <div class="flex">
          <label class="labelTitle dark:text-white ">Tanggal</label>
          <label class="labelValue dark:text-white">: {{ data.picket.date }} </label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Cuaca</label>
          <label class="labelValue dark:text-white">: {{ Helper.getWeartherString(data.picket.weather) }}</label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Mulai Jam</label>
          <label class="labelValue dark:text-white">: {{ data.picket.startAt }} </label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Berakhir Jam</label>
          <label class="labelValue dark:text-white">: {{ data.picket.endAt }} </label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Jumlah Guru</label>
          <label class="labelValue dark:text-white">: </label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Jumlah Siswa</label>
          <label class="labelValue dark:text-white">: </label>
        </div>
        <div class="flex">
          <label class="labelTitle dark:text-white">Picket Dibuka oleh</label>
          <label class="labelValue dark:text-white">: {{ data.picket.createdName }}</label>
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
    </div>


  </AdminPage>
</template>

<script setup>
import AdminPage from "@/components/AdminPage.vue";
import { PicketService } from "@/services/PicketService";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { Helper } from "@/helper";
import { FwbTab, FwbTabs } from 'flowbite-vue'

const activeTab = ref('first')
const systemMessage = ref("");
const data = reactive({ picket: null })

const route = useRoute();
var picketId = route.params.id;

const openPicket = async () => {
  const response = await PicketService.openPicket();
}


onMounted(async () => {

  var response = null;
  if (picketId) {
    response = await PicketService.getById(picketId);
  } else {
    response = await PicketService.get();
  }
  if (!response.isSuccess) {
    systemMessage.value = `Piket hari ini,  ${Helper.getIndonesiaDay(new Date().getDay())}, ${Helper.formatDate(new Date())} belum dibuka.`;
  } else {
    data.picket = response.data;
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

.labelValue dark:text-white {
  font-weight: normal;
}
</style>