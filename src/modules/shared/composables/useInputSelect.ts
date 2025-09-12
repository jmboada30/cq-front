import { storeToRefs } from 'pinia';
import { useInputSelectStore } from '../store/usInputSelectStore';

export const useInputSelect = () => {
  const store = useInputSelectStore();
  const { inputContent } = storeToRefs(store);

  return {
    inputContent,

    resetInput: store.resetInput,
  };
};
