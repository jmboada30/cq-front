<script setup lang="ts">
import LogoImage from '../../shared/components/LogoImage.vue';
import { version } from '../../../../package.json';
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-primary">
      <q-page class="q-px-md row items-center justify-center">
        <q-card
          class="card col-12 col-sm-8"
          :style="$q.screen.gt.xs ? 'max-width: 700px' : 'max-width: 450px'"
          flat
        >
          <q-card-section
            class="text-center column items-center justify-center"
          >
            <LogoImage :routerTo="'backend-conn'" :isDark="true" />
          </q-card-section>

          <router-view></router-view>
        </q-card>
        <div class="absolute-bottom-right q-pr-md q-pb-sm">
          <span class="text-subtitle2 text-weight-light opacity text-grey-12"
            >v{{ version }}</span
          >
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.opacity {
  opacity: 0.5;
}
.card {
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
