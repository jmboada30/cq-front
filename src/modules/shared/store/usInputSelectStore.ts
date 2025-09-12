import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInputSelectStore = defineStore('inputSelect', () => {
  const inputContent = ref('');

  const resetInput = () => {
    inputContent.value = '';
  };

  return {
    inputContent,

    resetInput,
  };
});
