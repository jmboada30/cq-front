import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('Filter', () => {
  const filterTypeStore = ref<string>('DESCRIPTION');
  return {
    // state
    filterTypeStore,
    // getters

    // actions
  };
});
