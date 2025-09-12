import { ref } from 'vue';
import { isAuthorizedApi } from '../apis/authApi';

const useAuthorizeAdmin = () => {
  const state = ref({
    email: '',
    password: '',
  });

  const isAuth = async () => {
    await isAuthorizedApi({
      email: state.value.email,
      password: state.value.password,
    });
  };

  return {
    //refs
    state,

    //actions
    isAuth,
  };
};

export default useAuthorizeAdmin;
