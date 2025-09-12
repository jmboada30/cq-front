import { defineStore } from 'pinia';
import { Dark, LocalStorage } from 'quasar';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  // Estado reactivo
  const isMenuOpen = ref(false);
  const isMiniState = ref(true);
  const isDarkMode = ref(false);
  const isSubItemOpen = ref(false);
  const currentTitle = ref('');

  // Métodos
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    isMiniState.value = !isMenuOpen.value;
  };

  const toggleMiniState = () => {
    isMiniState.value = !isMiniState.value;
  };

  const toggleSubItem = () => {
    isSubItemOpen.value = !isSubItemOpen.value;
  };

  const updateTheme = (isDark: boolean) => {
    const theme = isDark ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  };

  const toggleDark = () => {
    isDarkMode.value = !isDarkMode.value;
    LocalStorage.set('isDarkMode', isDarkMode.value);
    Dark.set(isDarkMode.value);
    updateTheme(isDarkMode.value);
  };

  const checkDarkMode = () => {
    isDarkMode.value = LocalStorage.getItem('isDarkMode') || false;
    Dark.set(isDarkMode.value);
    updateTheme(isDarkMode.value);
  };

  // Inicializar tema oscuro al cargar
  checkDarkMode();

  // Retornar todo lo que necesites exponer
  return {
    isMenuOpen,
    isMiniState,
    isDarkMode,
    isSubItemOpen,
    currentTitle,
    toggleMenu,
    toggleMiniState,
    toggleSubItem,
    toggleDark,
    checkDarkMode,
  };
});
