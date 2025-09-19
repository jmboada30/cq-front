<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useAuth from '../composables/useAuth'; // 1. Importa tu composable

const route = useRoute();
const router = useRouter();
const { setJwtToLocalStore } = useAuth(); // 2. Extrae la función que necesitas

const token = route.query.token as string;

if (token) {
  // 3. Reutiliza tu función para guardar en LocalStorage
  setJwtToLocalStore(token);

  router.replace({ name: 'home' }); // O la ruta que corresponda
} else {
  console.error('No se recibió el token de autenticación.');
  router.replace({ name: 'signin' }); // o 'login'
}
</script>

<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column items-center">
      <q-spinner-cube color="white" size="5.5em" />
      <div class="text-h6 text-white q-mt-md">Autenticando...</div>
    </div>
  </q-page>
</template>
