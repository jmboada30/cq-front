<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useFilterStore } from '../store/userFilterStore';
import useUi from '../../start/composables/useUi';

const filterStore = useFilterStore();
const { filterTypeStore } = storeToRefs(filterStore);
const { isDarkMode } = useUi();

const props = defineProps<{
  tabs: Array<{
    name: string;
    label: string;
    icon: string;
  }>;
  initialFilterType?: string;
}>();

onBeforeMount(() => {
  const tabNames = props.tabs.map((tab) => tab.name);
  if (props.initialFilterType && tabNames.includes(props.initialFilterType)) {
    filterTypeStore.value = props.initialFilterType;
  } else if (!tabNames.includes(filterTypeStore.value)) {
    filterTypeStore.value = props.tabs[0]!.name;
  }
});
</script>

<template>
  <q-tabs
    no-caps
    v-model="filterTypeStore"
    active-color="primary"
    :class="isDarkMode ? 'q-dark' : 'bg-grey-3'"
    class="full-width row q-mb-md q-tabs-custom"
  >
    <q-tab
      v-for="tab in props.tabs"
      :key="tab.name"
      class="col-4 no-wrap"
      :name="tab.name"
      :icon="tab.icon"
      :label="tab.label"
    />
  </q-tabs>
</template>
