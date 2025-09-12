<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

interface Props {
  title: string;
  message: string;
  debounce?: number;
}

const props = defineProps<Props>();
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const second = ref<number>(props.debounce || 5);

const onConfirm = () => {
  onDialogOK(true);
};

const interval = setInterval(() => {
  second.value--;
  if (second.value === 0) {
    clearInterval(interval);
  }
}, 1000);
</script>

<template>
  <q-dialog ref="dialogRef" :persistent="true">
    <q-card>
      <q-card-section class="row items-start justify-between q-pb-xs col-12">
        <div class="col-12 row justify-between q-py-xs items-center bb_container">
          <span class="text-h6 text-weight-medium"> {{ props.title }} </span>
          <q-btn
            @click="onDialogCancel"
            icon="sym_r_close"
            unelevated
            round
            dense
            color="grey-3"
            text-color="grey"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <span v-html="props.message"></span>
      </q-card-section>
      <q-card-section class="row justify-end">
        <div class="q-gutter-x-xs">
          <q-btn
            :disable="second !== 0"
            :label="`${second > 0 ? ` Espere ${second}` : 'Confirmar'}`"
            color="negative"
            class="col-5 self-end"
            @click="onConfirm"
            outline
          />
          <q-btn color="primary" icon="sym_r_close" label="Cancelar" @click="onDialogCancel" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="scss"></style>
