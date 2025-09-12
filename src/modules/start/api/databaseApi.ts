import { api } from 'src/boot/axios';

import type { CreateSettingDto, Setting } from '../interfaces/initialSetting';
import type { CheckDbConn, DBConn } from '../interfaces/dbConn';
import useHandlerErrors from '../../shared/composables/useHandlerErrors';

const { handleApiResponseError } = useHandlerErrors();

export const createParamsDbConnection = async (body: { settings: CreateSettingDto[] }) => {
  const resp = await api.post('/settings/upsert-many', body);
  return resp;
};

export const updateParams = async (body: { value: boolean }, name: string) => {
  try {
    const resp = await api.patch(`/settings/${name}/update`, body);
    return resp;
  } catch (error) {
    handleApiResponseError(error);
  }
};

export const checkBackendConn = async (payload: CheckDbConn) => {
  const resp = await api.get<DBConn>('/settings/check-connection', {
    baseURL: payload.baseURL || '',
    headers: {
      'x-apikey': payload.apiKey,
    },
  });
  return resp?.status === 200;
};

export const getQrString = async () => {
  const resp = await api.get('/connect-qr/qr-connect');
  return resp;
};

export const testConnectionBack = async (payload: string) => {
  const resp = await api.get('/connect-qr/qr-scanned', {
    headers: {
      'x-apikey': payload,
    },
  });
  return resp;
};

export const testConnectionDB = async () => {
  const resp = await api.get('/database/test-connection');
  return resp?.status === 200;
};

export const testConnectionDbOs = async () => {
  const resp = await api.get('/database/test-connection-os');
  return resp?.status === 200;
};

export const getParamsConnect = async () => {
  const { data } = await api.get<Setting[]>('/database/params-connect');
  return data || [];
};
