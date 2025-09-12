import { api } from 'src/boot/axios';
import type { DropDown } from '../interface/DropDown';

const getDropDown = async (resource: string) => {
  const resp = await api.get<DropDown[]>(`drop-downs/${resource}`);
  return resp.data;
};

const getDropDownById = async (resource: string, id: number) => {
  const resp = await api.get<DropDown[]>(`drop-downs/${resource}/by-id/${id}`);
  return resp.data;
};

export { getDropDown, getDropDownById };
