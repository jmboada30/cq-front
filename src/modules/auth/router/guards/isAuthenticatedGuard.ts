import type { NavigationGuard } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';

const isAuthenticatedGuard: NavigationGuard = async (_to, _from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = await authStore.checkUserJwt();
  if (!isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
};

export default isAuthenticatedGuard;
