import { api } from 'src/boot/axios';
import type { UserDetail, UserResponse } from '../interfaces/userInterface';
import type { UserDto } from '../interfaces/usersDtoInterface';

const resourceUrl = 'users';

export const findAllUsers = async (): Promise<UserResponse> => {
  const res = await api.get<UserResponse>(resourceUrl);
  return res.data;
};

export const findOneById = async (id: number): Promise<UserDetail> => {
  const res = await api.get(`${resourceUrl}/${id}`);
  return res.data;
};

export const toggleActiveUser = async (payload: UserDto): Promise<unknown> => {
  const { id, ...body } = payload;
  const res = await api.patch(`${resourceUrl}/${id}`, body);
  return res.data;
};
