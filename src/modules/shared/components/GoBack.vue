<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();

interface Props {
  title: string;
  subTitle?: string;
  isDisabled: boolean;
  backButtonUrl?: string;
}

const goBack = async () => {
  if (props.backButtonUrl) {
    await router.push(props.backButtonUrl);
  } else {
    router.go(-1);
  }
};

const props = defineProps<Props>();
</script>

<template>
  <q-btn
    class="q-px-xs"
    style="text-transform: none"
    @click="goBack()"
    id="back"
    unelevated
    :disable="isDisabled"
  >
    <q-icon v-if="!isDisabled" :size="$q.screen.gt.xs ? 'sm' : 'xs'" name="sym_r_arrow_back" />
    <div class="column justify-start items-start">
      <span
        class="text-h6 text-weight-thin text-dark text-left"
        :class="isDisabled ? 'q-pl-none' : 'q-pl-sm'"
      >
        {{ title }}
      </span>
      <span v-if="subTitle" class="text-caption text-grey-8 text-left">
        {{ subTitle }}
      </span>
    </div>
  </q-btn>
</template>
<style scoped>
.disabled,
[disabled] {
  opacity: 1 !important;
}
</style>
