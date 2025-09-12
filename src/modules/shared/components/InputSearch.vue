<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useFilterStore } from '../store/userFilterStore';

const filterStore = useFilterStore();

const { filterTypeStore } = storeToRefs(filterStore);

interface Props {
  placeholderText: string;
  inputSearch?: string | undefined;
  showIcon?: boolean;
}
const props = defineProps<Props>();

const inputSearch = ref<string | undefined>(props.inputSearch ?? '');

watch(filterTypeStore, () => {});
</script>

<template>
  <q-input
    v-model="inputSearch"
    dense
    debounce="800"
    color="primary"
    outlined
    :placeholder="props.placeholderText"
  >
    <template v-slot:append>
      <q-icon v-if="props.showIcon !== true" name="sym_r_search" />
    </template>
  </q-input>
</template>
