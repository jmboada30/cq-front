import { Loading } from 'quasar';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useDropDownStore } from '../store/useDropDownStore';
import { getDropDown } from '../apis/DropDownsApi';
import { watch } from 'vue';
import type { ResourceDD } from '../interface/DropDown';

const useDropDown = (resource: ResourceDD) => {
  const store = useDropDownStore();
  const { banks, menuItems, menuItemDDown } = storeToRefs(store);

  const queryDropDown = useQuery({
    queryKey: ['dd-' + resource],
    queryFn: () => getDropDown(resource),
    retry: 0,
    staleTime: Infinity,
  });

  watch(queryDropDown.isLoading, (isLoading) => {
    if (isLoading) {
      Loading.show({ group: 'loading' });
    } else {
      Loading.hide('loading');
    }
  });

  watch(queryDropDown.data, (newVal) => {
    if (!newVal?.length) return;

    switch (resource) {
      case 'banks':
        store.banks = newVal.map((bank) => ({
          value: bank.value as number,
          label: bank.label,
        }));
        break;
      case 'menu-items':
        store.menuItems = newVal;
        break;
      case 'menu-items-drop-down':
        store.menuItemDDown = newVal;
        break;
    }
  });

  return {
    banks,
    menuItems,
    menuItemDDown,
  };
};

export default useDropDown;
