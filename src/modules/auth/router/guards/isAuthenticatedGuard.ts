// en: auth/router/guards/isAuthenticatedGuard.ts

import type { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { AuthRoutes } from '../../interfaces/auth-routes';

const isAuthenticatedGuard: NavigationGuard = async (to, _from, next) => {
  if (to.name === AuthRoutes.CALLBACK || to.meta.isPublic) {
    next();
    return;
  }

  // Verificación de autenticación para todas las demás rutas:
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkUserJwt();

  if (isAuthenticated) {
    next(); // El usuario está autenticado, permite el paso.
  } else {
    // El usuario no está autenticado, redirige a la página de login.
    next({ name: AuthRoutes.LOGIN });
  }
};

export default isAuthenticatedGuard;
