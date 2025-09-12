<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, watch, computed, ref } from 'vue';
import { QInput } from 'quasar';

import useUtils from '../composables/useUtils';
import { useInputSelect } from '../composables/useInputSelect';
import type { DropDown } from '../interface/DropDown';

export interface InputSelectI {
  resetInputLabel: () => void;
  focusInput: () => void;
  setInputLabel: (newVal: string) => void;
}

interface Props {
  modelValue: string | number | any[] | undefined;
  options: { label: string; value: string | number }[];
  label?: string;
  can_create?: boolean;
  page_level?: boolean;
  keepContent?: boolean;
  autoClearOnSelect?: boolean;
  use_multiple?: boolean;
  emit_label?: boolean;
  type?: 'text' | 'number' | 'email';
  disable?: boolean;
  keepList?: boolean;
  hint?: string;
  emit_dd?: boolean;
}

interface emits {
  (event: 'update:modelValue', newVal: any): void;
  (event: 'openDialog', item?: any): void;
  (event: 'filter', inputValue: string, doneFn: (callBackFn: () => void) => void): void;
}

const props = defineProps<Props>();

// Definir los eventos
const emit = defineEmits<emits>();

const inputLabel = ref();
const { inputContent } = useInputSelect();
const { setTimeoutPromise } = useUtils();
const inputRef = ref<QInput>();

const showing = ref(false);
const showClearable = ref(false);
const selectedIndex = ref(-1);

const focusInput = () => {
  inputRef.value?.focus();
};

const zIndex = computed(() => {
  let val = '';
  if (props.page_level) val = 'z-index:auto';
  return val;
});

const filteredOptions = computed(() => {
  if (!inputLabel.value) return props.options; // Si no hay valor, mostrar todas las opciones
  return props.options.filter((item) =>
    item.label.toLowerCase().includes(String(inputLabel.value).toLowerCase()),
  );
});

const currentOption = computed(() => {
  return props.options.find((item) => item.value == props.modelValue)?.label;
});

const setMultipleValToString = (newVal: string | number | DropDown | null) => {
  if (!String(props.modelValue).includes(String(newVal)))
    return emit('update:modelValue', String(props.modelValue).concat(`,${newVal}`));

  return emit(
    'update:modelValue',
    String(props.modelValue)
      .split(',')
      .filter((val) => val !== newVal)
      .join(','),
  );
};

const isSelected = (item: { label: string; value: string | number }): boolean => {
  if (!props.use_multiple) return false;

  if (props.emit_label) return String(props.modelValue).includes(item.label);

  return String(props.modelValue).includes(String(item.value));
};

// Función para emitir el nuevo valor
const updateValue = (newValue: string | number | DropDown | null) => {
  if (!props.use_multiple) return emit('update:modelValue', newValue);

  if (!Array.isArray(props.modelValue)) return setMultipleValToString(newValue);

  if (!props.modelValue.includes(newValue))
    return emit('update:modelValue', [...props.modelValue, newValue]);

  return emit(
    'update:modelValue',
    props.modelValue.filter((val) => val !== newValue),
  );
};

const filterFn = (newVal: string | number | null, update: (callbackFn: () => void) => void) => {
  showing.value = true;
  emit('filter', String(newVal), update);
};

const onSelect = (selectedOption: { label: string; value: string | number }) => {
  if (!selectedOption) return;
  inputLabel.value = selectedOption.label;
  showClearable.value = true;

  if (props.emit_label) updateValue(selectedOption.label);
  else if (props.emit_dd) updateValue(selectedOption);
  else updateValue(selectedOption.value);

  if (props.use_multiple) return (inputLabel.value = '');

  if (props.keepList) return (showing.value = true);
  showing.value = false;
};

const scrollToSelected = () => {
  setTimeout(() => {
    const activeItem = document.querySelector('.menu-item.active');
    activeItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 10);
};

const resetInputLabel = () => {
  inputLabel.value = '';
};

const setInputLabel = (newValue: string) => {
  inputLabel.value = newValue;
};

const clear = () => {
  inputLabel.value = '';
};

const onKeyDown = (event: KeyboardEvent) => {
  if (!showing.value) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      selectedIndex.value =
        selectedIndex.value < filteredOptions.value.length - 1 ? selectedIndex.value + 1 : 0;
      scrollToSelected();
      break;
    case 'ArrowUp':
      event.preventDefault();
      selectedIndex.value =
        selectedIndex.value > 0 ? selectedIndex.value - 1 : filteredOptions.value.length - 1;
      scrollToSelected();
      break;
    case 'Enter':
      if (selectedIndex.value !== -1) {
        event.preventDefault();
        onSelect(filteredOptions.value[selectedIndex.value]!);
      }
      break;
  }
};

const onBlur = () => {
  if (!props.keepContent) return;
  if (currentOption.value) inputLabel.value = String(currentOption.value);
};

defineExpose({ setInputLabel, resetInputLabel, focusInput });

watch(
  inputLabel,
  () => {
    inputContent.value = inputLabel.value;
    if (!props.use_multiple && inputLabel.value === '') {
      updateValue('');
      showClearable.value = false;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

watch(
  currentOption,
  () => {
    if (currentOption.value) inputLabel.value = String(currentOption.value);
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await setTimeoutPromise(100);
});
</script>

<template>
  <q-input
    ref="inputRef"
    dense
    v-model="inputLabel"
    select
    outlined
    :disable="disable"
    :label="label"
    debounce="300"
    @keydown="onKeyDown"
    style="max-height: 200px"
    @update:model-value="(val) => filterFn(val, (callbackFn) => callbackFn())"
    @blur="onBlur"
    :class="{ 'hide-spinners': type === 'number' }"
    :type="type"
    :hint="props.hint"
  >
    <template v-slot:append>
      <q-icon v-if="showClearable" name="sym_r_cancel" clickable @click="clear" />
      <q-icon
        name="sym_r_keyboard_arrow_down"
        @click="
          showing = !showing;
          focusInput();
        "
      />
    </template>
    <q-menu
      v-model="showing"
      no-parent-event
      no-focus
      fit
      anchor="bottom middle"
      self="top middle"
      :style="zIndex"
    >
      <q-list style="min-width: 100px; max-height: 240px" class="list-container">
        <q-item
          v-for="(item, index) in filteredOptions"
          :key="index"
          clickable
          @click="onSelect(item)"
          class="menu-item"
          @mouseenter="selectedIndex = -1"
          :class="{
            active: index === selectedIndex,
            selected: isSelected(item),
          }"
        >
          <!-- {selected: String(modelValue).includes(item)} -->
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>

        <q-item v-if="can_create">
          <q-item-section>
            <q-btn
              color="primary"
              icon="sym_r_add"
              :label="`Crear: ${inputLabel}`"
              outline
              @click="emit('openDialog')"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-input>
</template>
<style scoped lang="scss">
.menu-item:hover {
  cursor: pointer;
  background-color: $grey-3;
}

.active {
  background-color: $grey-3 !important;
}

.list-container:has(.menu-item.active) .menu-item:hover {
  background-color: transparent;
}

.selected {
  color: aqua;
}
</style>
