<template>
  <AdminPage>
    <div v-if="systemMessage">
      <div class="alert alert-warning">
        {{ systemMessage }}
      </div>
      <FwbButton color="red">test</FwbButton>
    </div>
  </AdminPage>
</template>

<script setup>
import AdminPage from "@/components/AdminPage.vue";
import { PicketService } from "@/services/PicketService";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Helper } from "@/helper";
import { FwbButton } from "flowbite-vue";

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
</style>
