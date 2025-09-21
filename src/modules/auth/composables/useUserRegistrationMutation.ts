import { useMutation } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import type { AxiosError } from 'axios';
import useNotify from 'src/modules/shared/composables/useNotify';
import { register } from '../api/authApi';
import type { ApiErrorResponse, RegisterForm } from '../interfaces/registerInterfaces';
import { useAuthStore } from '../stores/useAuthStore';
import useAuth from './useAuth';
import { useRouter } from 'vue-router';

const useUserRegistrationMutation = () => {
  const store = useAuthStore();
  const { registerForm } = storeToRefs(store);
  const { errorNotify, successNotify } = useNotify();
  const { setJwtToLocalStore } = useAuth();
  const router = useRouter();

  const userRegistrationMutation = useMutation({
    mutationFn: ({ email, name, password }: RegisterForm) => register({ email, name, password }),
    onSuccess: ({ jwt }) => {
      successNotify('Usuario registrado con éxito', 2000);
      setJwtToLocalStore(jwt);
      router.replace({ name: 'home' });
    },
    onError: (error) => {
      const errorResponse = error as AxiosError<ApiErrorResponse>;
      if (errorResponse.response && errorResponse.response.data) {
        if (errorResponse.response.status === 409) {
          const errorMessage =
            errorResponse.response.data.message || 'El usuario se encuentra registrado.';
          return errorNotify(errorMessage);
        }
      }
      errorNotify('Ocurrió un error inesperado al agregar el registrar el usuario.');
    },
  });

  return {
    registerForm,
    userRegistrationMutation,
    clearRegisterForm: store.clearRegisterForm,
  };
};

export default useUserRegistrationMutation;
