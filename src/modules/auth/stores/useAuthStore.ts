import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

import useHandlerErrors from '../../shared/composables/useHandlerErrors';
import type { AuthUser, LoginForm, UserRole } from '../interfaces/auth';
import { validateJwt } from '../api/authApi';
import type { RegisterForm } from '../interfaces/registerInterfaces';

const initialState = {
  loginForm: {
    email: '',
    password: '',
    remember: false,
  },
  user: {
    id: 0,
    email: '',
    roles: 'user' as UserRole,
    jwt: '',
    isActive: true,
  } as AuthUser,
  permission: '',
};

const initialStateRegister: RegisterForm = {
  email: '',
  name: '',
  password: '',
};

export const useAuthStore = defineStore('auth', () => {
  const { handleApiResponseError } = useHandlerErrors();
  const loginForm = ref<LoginForm>({ ...initialState.loginForm });
  const registerForm = ref<RegisterForm>(structuredClone(initialStateRegister));

  const user = ref<AuthUser>({ ...initialState.user });

  const permission = ref<string>(initialState.permission);

  const clearRegisterForm = () => (registerForm.value = structuredClone(initialStateRegister));

  const clearLoginForm = () => {
    loginForm.value = { ...initialState.loginForm };
  };

  const clearUser = () => {
    user.value = { ...initialState.user };
  };

  const clearPermissions = () => {
    permission.value = initialState.permission;
  };

  const checkUserJwt = async () => {
    try {
      const authUser = await validateJwt();
      user.value = authUser;
      LocalStorage.set('jwt', authUser.jwt);
      return true;
    } catch (error) {
      handleApiResponseError(error);
      return false;
    }
  };

  return {
    // state
    loginForm,
    registerForm,
    user,
    permission,

    // getters
    profileUser: computed(() => user.value.profileId),

    // actions
    clearLoginForm,
    clearRegisterForm,
    clearUser,
    clearPermissions,
    checkUserJwt,
  };
});
