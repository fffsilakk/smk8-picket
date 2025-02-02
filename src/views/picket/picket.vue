<script setup>
import { computed, reactive, ref } from "vue";
import AdminPage from "../../components/AdminPage.vue";
import { PicketService } from "../../services/PicketService";
import { Helper } from "../../helper";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const data = reactive({
  pageSizes: [5, 10, 50, 100],
  paginateResult: {data: [], totalRecords: 0 },
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
    data.paginateResult = result.data;
    pageNumbers.value = getPageNumbers();
  }
};

const changePageSize = (event) => {
  getData(data.paginate);

};


getData(data.paginate);


///pagehinaton

const totalPages = () => {
  return Math.ceil(data.paginateResult.totalRecords / data.paginate.pageSize);
}

const pageNumbers = ref();

const getPageNumbers = () => {
  let startPage = data.paginate.page - 1;
  let endPage = data.paginate.page + 1;

  if (data.paginate.page === 1) {
    startPage = 1;
    endPage = 3;
  } else if (data.paginate.page === totalPages()) {
    startPage = totalPages() - 2;
    endPage = totalPages();
  }

  // Ensure that page numbers are within valid range
  startPage = Math.max(startPage, 1);
  endPage = Math.min(endPage, totalPages());

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages())
    return;
  data.paginate.page = page;
  getData(data.paginate);
}

const searchText = ($event) => {
 data.paginate.searchTerm = $event.target.value;
  getData(data.paginate);
}





</script>

<template>
  <AdminPage>
    <div class="">
      <h2 class="text-2xl font-semibold mb-6">Data Piket</h2>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <div class="my-2 flex sm:flex-row flex-col items-center sm:justify-between">
          <select v-model="data.paginate.pageSize" @change="changePageSize">
            <option v-for="item in data.pageSizes" :value="item">
              {{ item }}
            </option>
          </select>
          <input v-model="data.paginate.searchTerm" type="text" placeholder="Search..." @change="searchText"
            class="p-2 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700" />
        </div>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Nomor</th>
              <th scope="col" class="px-6 py-3">Tanggal</th>
              <th scope="col" class="px-6 py-3">Cuaca</th>
              <th scope="col" class="px-6 py-3">Jam Mulai</th>
              <th scope="col" class="px-6 py-3">Jam Selesai</th>
              <th scope="col" class="px-6 py-3">Dibuka Oleh</th>
              <th class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(department, index) in data.paginateResult.data" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ Helper.getIndonesiaDay(new Date(department.date).getDay()) }}, {{ Helper.formatDate(department.date)  }}</td>
              <td class="px-6 py-4">
                {{ Helper.getWeartherString(department.weather) }}
              </td>
              <td class="px-6 py-4">{{ department.startAt }}</td>
              <td class="px-6 py-4">{{ department.endAt }}</td>
              <td class="px-6 py-4">{{ department.createdName }}</td>
              <td class="w-10 px-6 py-4 flex gap-2">
                <router-link :to="`/Jurusan/${department.id}/edit`">
                  <button class="text-white flex">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-black hover:text-emerald-500 dark:text-white ml-2" fill="currentColor"
                      viewBox="0 0 512 512">
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                    </svg>
                  </button>
                </router-link>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6">
                <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div class="flex flex-1 justify-between sm:hidden">
                    <a href="#"
                      class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#"
                      class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                  </div>
                  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm text-gray-700">
                        {{ data.paginateResult.data.length }} of {{ data.paginateResult.totalRecords }}
                      </p>
                    </div>
                    <div>
                      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a @click="goToPage(data.paginate.page - 1)"
                          class=" cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          <span class="sr-only">Previous</span>
                          <ChevronLeftIcon class="size-5" aria-hidden="true" />
                        </a>

                        <a v-for="page in pageNumbers" :key="page" aria-current="page" @click="goToPage(page)"
                          :class="{ active: data.paginate.page === page }"
                          class="cursor-pointer relative z-10 inline-flex items-center px-4 py-2 text-sm focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          {{ page }}</a>

                        <a @click="goToPage(data.paginate.page + 1)"
                          class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                          <span class="sr-only">Next</span>
                          <ChevronRightIcon class="size-5" aria-hidden="true" />
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
    </div>
  </AdminPage>
</template>

<style lang="css" scoped>
.active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}
</style>