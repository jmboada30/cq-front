<script setup lang="ts">
import EssentialLinks from "./EssentialLinks.vue";
import { useMenuItemByUserQuery } from "../composables/useMenuItemByUserQuery";

const { menuItemsFormatted } = useMenuItemByUserQuery();
</script>
<template>
  <q-card flat class="bg-dark rounded-borders q-ma-md q-mt-lg q-pa-md">
    <q-card-section class="text-center">
      <q-img
        src="images/svg/devi-animated.svg"
        height="100px"
        fit="contain"
        class="q-mb-sm logo-devi"
      />
      <p class="text-weight-bold text-space-mono text-body1">¡Únete a la conversación!</p>
      <p class="text-caption text-">
        Inicia sesión o regístrate para interactuar con la comunidad
      </p>
    </q-card-section>
    <q-card-actions class="q-gutter-sm">
      <q-btn flat color="primary" label="Iniciar sesión" class="bg-primary full-width" />
      <q-btn flat outline label="Registrarse" class="bg-secondary full-width" />
    </q-card-actions>
  </q-card>
  <q-list class="q-px-sm q-gutter-sm sidebar__menu text-blue-grey-9" padding>
    <EssentialLinks v-for="link in menuItemsFormatted" :key="link.title!" v-bind="link" />
  </q-list>
</template>
