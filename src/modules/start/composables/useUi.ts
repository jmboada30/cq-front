import { storeToRefs } from 'pinia';

import { useUiStore } from '../stores/uiStore';

const useUi = () => {
  const store = useUiStore();
  const { isMenuOpen, isDarkMode, isMiniState, isSubItemOpen, currentTitle } = storeToRefs(store);

  return {
    isMenuOpen,
    isDarkMode,
    isMiniState,
    isSubItemOpen,
    currentTitle,
    setForceDarkMode: store.setForceDarkMode,
    toggleMenu: store.toggleMenu,
    toggleDark: store.toggleDark,
    checkDarkMode: store.checkDarkMode,
    toggleSubItem: store.toggleSubItem,
    toggleMiniState: store.toggleMiniState,
  };
};

export default useUi;
