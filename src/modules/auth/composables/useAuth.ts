import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Loading, LocalStorage } from 'quasar';
import useNotify from '../../shared/composables/useNotify';
import { useAuthStore } from '../stores/useAuthStore';
import type { LoginForm } from '../interfaces/auth';
import { signIn } from '../api/authApi';

const useAuth = () => {
  const router = useRouter();
  const notify = useNotify();
  const authStore = useAuthStore();

  const { user, loginForm, permission, profileUser } = storeToRefs(authStore);

  const login = async () => {
    Loading.show({
      group: 'auth-login',
      message: 'Comprobando credenciales, por favor espere...',
    });
    try {
      const jwt = await signIn(loginForm.value);

      if (loginForm.value.remember) setLoginFormToLocalStore({ ...loginForm.value, password: '' });
      setJwtToLocalStore(jwt);

      await router.push('/');
    } catch (error) {
      notify.errorNotify(`Contraseña o correo inválido ${error}`);
    } finally {
      Loading.hide('auth-login');
    }
  };

  const logout = () => {
    authStore.clearUser();
    authStore.clearPermissions();
    removeJwtFromLocalStore();
    void router.replace({ name: 'login' });
  };
  //TODO: crear método en el backend para cerrar sesión permitiendo llevar un registro del mismo

  const getLoginFormFromLocalStore = () => {
    return LocalStorage.getItem<LoginForm>('loginForm');
  };

  const setLoginFormToLocalStore = (loginForm: LoginForm) => {
    LocalStorage.set('loginForm', loginForm);
  };

  const getJwtFromLocalStore = () => {
    return LocalStorage.getItem<string>('jwt');
  };

  const setJwtToLocalStore = (jwt: string) => {
    LocalStorage.set('jwt', jwt);
  };

  const removeJwtFromLocalStore = () => {
    LocalStorage.remove('jwt');
  };

  return {
    // props
    loginForm,
    user,
    permission,

    // getters
    profileUser,

    // actions
    login,
    logout,
    getJwtFromLocalStore,
    getLoginFormFromLocalStore,
  };
};

export default useAuth;
