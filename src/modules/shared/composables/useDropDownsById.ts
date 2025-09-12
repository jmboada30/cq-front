import { Loading } from 'quasar';
import { useQuery } from '@tanstack/vue-query';
// import { storeToRefs } from 'pinia';

// import { useDropDownStore } from '../store/useDropDownStore';
import { getDropDownById } from '../apis/DropDownsApi';
import { watch } from 'vue';
import type { ResourceDDById } from '../interface/DropDown';

const useDropDownById = (resource: ResourceDDById, id: number) => {
  // const store = useDropDownStore();
  // const {} = storeToRefs(store);

  const queryDropDown = useQuery({
    queryKey: ['dd-' + resource],
    queryFn: () => getDropDownById(resource, id),
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

    // switch (resource) {
    //   case 'assets-by-warehouse':
    //     store.assetsById = newVal;
    //     break;
    //   case 'assets-without-warehouse':
    //     store.assetsById = newVal;
    //     break;
    //   case 'warehouses-by-operation-subtype':
    //     store.warehouseById = newVal;
    //     break;
    // }
  });

  return {};
};

export default useDropDownById;
