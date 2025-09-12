import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserDto } from '../interfaces/usersDtoInterface';
import type { UserDetail, UserItem } from '../interfaces/userInterface';

const initStateDto: UserDto = {
  id: undefined,
  email: undefined,
  isActive: true,
};

export const useUserStore = defineStore('userStore', () => {
  const users = ref<UserItem[]>([]);
  const userDetail = ref<UserDetail | null>(null);
  const userDto = ref<UserDto>(structuredClone(initStateDto));

  const resetUsers = () => {
    users.value = [];
    localStorage.removeItem('menuItems');
  };

  const resetUserDetail = () => {
    userDetail.value = null;
    localStorage.removeItem('userDetail');
  };

  const resetUserDto = () => {
    userDto.value = structuredClone(initStateDto);
  };

  return {
    // State
    users,
    userDto,
    userDetail,

    // Actions
    resetUsers,
    resetUserDetail,
    resetUserDto,
  };
});
