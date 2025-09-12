import { useMutation } from '@tanstack/vue-query';

import useVueQuery from 'src/modules/shared/composables/useVueQuery';
import { toggleActiveUser } from '../api/usersApi';
import { useUserManager } from './useUserManager';

export const useUserMutation = () => {
  const { invalidQuery } = useVueQuery();

  const { userDto, resetUserDto } = useUserManager();

  const updateUserMutation = useMutation({
    mutationFn: toggleActiveUser,
    onSuccess: () => invalidQuery({ queryKey: ['userQuery'], exact: false }),
  });

  return {
    // State
    userDto,

    // Actions
    resetUserDto,
    updateUserMutation,
  };
};
