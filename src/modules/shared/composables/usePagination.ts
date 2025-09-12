import { storeToRefs } from 'pinia';
import { usePaginationStore } from '../store/usePaginationStore';

export const usePagination = () => {
  const store = usePaginationStore();
  const { pagination } = storeToRefs(store);
  return {
    pagination,
    setPagination: store.setPagination,
  };
};
