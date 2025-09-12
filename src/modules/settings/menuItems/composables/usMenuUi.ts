import { storeToRefs } from 'pinia';

import { useMenuUiStore } from '../stores/useMenuUiStore';

export const useMenuUi = () => {
  const store = useMenuUiStore();
  const { isMenuOpen, isDarkMode, isMiniState, isSubItemOpen, currentTitle, drawer } =
    storeToRefs(store);

  return {
    isMenuOpen,
    isDarkMode,
    isMiniState,
    isSubItemOpen,
    currentTitle,
    drawer,
    toggleMenu: store.toggleMenu,
    toggleDark: store.toggleDark,
    checkDarkMode: store.checkDarkMode,
    toggleSubItem: store.toggleSubItem,
    toggleMiniState: store.toggleMiniState,
    toggleDrawer: store.toggleDrawer,
  };
};
