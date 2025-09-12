import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { BasicDropDown, DropDown } from '../interface/DropDown';

export const useDropDownStore = defineStore('DropDown', () => {
  return {
    banks: ref<BasicDropDown[]>([]),
    menuItems: ref<DropDown[]>([]),
    menuItemDDown: ref<DropDown[]>([]),

    // by ID
    // assetsById: ref<DropDown[]>([]),
  };
});
