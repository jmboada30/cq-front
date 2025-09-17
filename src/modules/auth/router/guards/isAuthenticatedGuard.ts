import type { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';

const isAuthenticatedGuard: NavigationGuard = async (_to, _from, next) => {
  const authStore = useAuthStore();

  const publicPages = ['login', 'callback'];

  // 2. Comprueba si la ruta de destino está en nuestra lista blanca.
  // El 'to.name' puede ser un Symbol, por eso lo convertimos a String.
  const authRequired = !publicPages.includes(String(_to.name));

  console.log('_to', _to.name);
  console.log('authRequired', authRequired);

  // 3. Si NO se requiere autenticación, permite el paso y termina.
  if (!authRequired) {
    return next();
  }

  const isAuthenticated = await authStore.checkUserJwt();
  if (!isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};

export default isAuthenticatedGuard;
