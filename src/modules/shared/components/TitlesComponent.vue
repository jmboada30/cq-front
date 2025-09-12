<script lang="ts" setup>
import { useQuasar } from 'quasar';

interface Props {
  title: string;
  buttonLabel?: string;
  empty?: boolean;
  hasButtons?: boolean;
}

interface Emits {
  (event: 'openDialog'): void;
}

const $q = useQuasar();

/* const isDesktopXs = () => {
  return $q.screen.xs ? 'text-bold text-h5 q-my-none' : 'text-bold text-h4 q-my-none';
}; */
withDefaults(defineProps<Props>(), {
  hasButtons: false,
});
const emits = defineEmits<Emits>();
</script>

<template>
  <div class="row q-py-sm col-12 justify-between">
    <span :class="`self-center  q-my-none   ${$q.screen.xs ? 'text-h5' : 'text-h4'} `">
      <slot name="beforeTitle"></slot>
      {{ title }}
    </span>

    <div>
      <div class="row q-gutter-x-md">
        <slot name="extra-actions"></slot>
        <q-btn
          class="rounded-borders"
          v-if="buttonLabel"
          :outline="empty ? false : true"
          color="primary"
          icon="sym_r_add"
          :label="$q.screen.xs ? '' : `${buttonLabel}`"
          @click="emits('openDialog')"
        />
      </div>
    </div>
  </div>
  <q-page-sticky expand position="top"> </q-page-sticky>
</template>
