import { storeToRefs } from 'pinia';
import { useMenuItemStore } from '../stores/useMenuItemStore';

const useMenuItems = () => {
  const store = useMenuItemStore();

  const { menuItemsMaster, menuItems, menuItemsOperations } = storeToRefs(store);

  return {
    menuItemsMaster,
    menuItems,
    menuItemsOperations,
    //actions
    clearState: store.clearState,
  };
};

export default useMenuItems;
