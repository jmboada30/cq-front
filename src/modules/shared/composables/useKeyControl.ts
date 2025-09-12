import { ref } from 'vue';
import type { DropDown } from '../interface/DropDown';

export const useKeyControl = () => {
  const selectedIndex = ref(-1);

  const onKeyDown = (
    event: KeyboardEvent,
    options: DropDown[],
    onSelect: (selectedOption: { label: string; value: string | number }) => void,
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex.value =
          selectedIndex.value < options.length - 1 ? selectedIndex.value + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex.value =
          selectedIndex.value > 0 ? selectedIndex.value - 1 : options.length - 1;
        break;
      case 'Enter':
        if (selectedIndex.value !== -1) {
          event.preventDefault();
          onSelect(options[selectedIndex.value]!);
        }
        break;
    }
  };

  return { selectedIndex, onKeyDown };
};
