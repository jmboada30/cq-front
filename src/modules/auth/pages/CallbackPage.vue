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

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useAuth from '../composables/useAuth'; // 1. Importa tu composable
// import { useAuthStore } from '../stores/useAuthStore';
// import { jwtDecode } from 'jwt-decode';

const route = useRoute();
//const router = useRouter();
const { setJwtToLocalStore } = useAuth(); // 2. Extrae la función que necesitas
//const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token as string;

  if (token) {
    console.log('se');
    // 3. Reutiliza tu función para guardar en LocalStorage
    setJwtToLocalStore(token);

    // 4. Actualiza el estado en Pinia (MUY IMPORTANTE)
    // Asumo que tu store tiene una acción para esto. Si no, añádela.
    //const user = jwtDecode(token); // Decodificamos para obtener el usuario
    // authStore.setUser(user); // Esta acción debería guardar el usuario en el state

    // 5. Redirige al home
    //router.replace({ name: 'home' }); // O la ruta que corresponda
  } else {
    console.error('No se recibió el token de autenticación.');
    //router.replace({ name: 'signin' }); // o 'login'
  }
});
</script>
