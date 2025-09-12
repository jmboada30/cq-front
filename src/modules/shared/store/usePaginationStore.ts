import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Pagination } from '../interface/Pagination';

const initialStatePagination: Pagination = {
  page: 1,
  rowsPerPage: 10,
  sortBy: 'desc',
  descending: false,
  rowsNumber: 0,
};

export const usePaginationStore = defineStore('Pagination', () => {
  const pagination = ref<Pagination>(initialStatePagination);

  const setPagination = (newPag: Pagination) => {
    pagination.value = newPag;
  };
  return { pagination, setPagination };
});
