<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a
      >
      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a
      >
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ pageSize }} of {{ totalRecords }}
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="size-5" aria-hidden="true" />
          </a>
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->

          <a
            v-for="item in pageButtons"
            @click="selectPage(item)"
            aria-current="page"
            :class="item.isCurrentPage ? 'bg-indigo-600' : ''"
            class="relative z-10 inline-flex items-center px-4 py-2 text-sm focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >{{ item.value }}</a
          >
          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="size-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
  {{ props.paginate }}
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { computed, watch, ref } from "vue";

const props = defineProps(["pagination", "totalRecords"]);
const emit = defineEmits(["onChangePage"]);

const currentPage = ref(0);
if (props.pagination.page) {
  currentPage.value = props.pagination.page;
}

watch(currentPage.value, (x) => {
  emit.apply("onChangePage", currentPage.value + 1);
});

const selectPage = (page) => {
  currentPage.value = page;
};

const pageButtons = computed(() => {
  const buttons = [];
  const totalButton = Math.round(
    props.totalRecords / props.pagination.pageSize
  );

  const startPage = totalButton <= 3 ? 1 :  currentPage.value - 1;
  const endPage = totalButton <= 3 ? totalButton : currentPage.value + 1;

  for (let i = 0; i < 3; i++) {
    // buttons.push({ name: i+currentPage.value, value: i+currentPage.value, isCurrentPage: i+1 == currentPage.value });
  }

  return buttons;
});
</script>
