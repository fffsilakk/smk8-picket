<script setup>
import { reactive } from "vue";
import AdminPage from "../../components/AdminPage.vue";
import { PicketService } from "../../services/PicketService";
import { Helper } from "../../helper";
import Pagination from "../../components/Pagination.vue";

const data = reactive({
  pageSizes: [5, 10, 50, 100],
  paginateResult:{},
  paginate: {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortOrder: "desc",
    columnOrder: "date",
  },
});

const getData = async (paginate) => {
  const result = await PicketService.Pageninate(paginate);
  if (result.isSuccess) {
    data.paginateResult=result.data;
  }
};

const changePageSize = (event) => {
  getData(data.paginate);
};

const changePage= (page)=>{
  data.paginate.page=page;
  getData(data.paginate);
}

getData(data.paginate);
</script>

<template>
  <AdminPage>
    <div
      class="mt-12 pt-10 p-6 md:px-10 sm:px-6 px-4 md:ml-64 sm:ml-64 flex flex-col"
    >
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <select v-model="data.paginate.pageSize" @change="changePageSize">
          <option v-for="item in data.pageSizes" :value="item">
            {{ item }}
          </option>
        </select>

        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Nomor</th>
              <th scope="col" class="px-6 py-3">Tanggal</th>
              <th scope="col" class="px-6 py-3">Cuaca</th>
              <th scope="col" class="px-6 py-3">Jam Mulai</th>
              <th scope="col" class="px-6 py-3">Jam Selesai</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(department, index) in data.paginateResult.data"
              :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ department.date }}</td>
              <td class="px-6 py-4">
                {{ Helper.getWeartherString(department.weather) }}
              </td>
              <td class="px-6 py-4">{{ department.startAt }}</td>
              <td class="px-6 py-4">{{ department.endAt }}</td>
              <td class="w-10 px-6 py-4 flex gap-2">
                <router-link :to="`/Jurusan/${department.id}/edit`">
                  <button class="text-white flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-black hover:text-emerald-500 dark:text-white ml-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                      />
                    </svg>
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination @onChangePage="changePage" :pagination="data.paginate" :totalRecords="data.paginateResult.totalRecords" ></Pagination>
      </div>
    </div>
  </AdminPage>
</template>
