import { ref } from 'vue';

import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { SettingGroupEnum, SettingNameEnum } from '../interfaces/initialSetting';
import type { CreateSettingDto } from '../interfaces/initialSetting';
import { api } from 'src/boot/axios';

export const useBackendConnStore = defineStore('backendConnection', () => {
  const iP = ref<string>('');
  const port = ref<string>('');
  const apiKey = ref<string>('');

  const paramsDbConn = ref<CreateSettingDto[]>([
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.server,
      description: 'IP Servidor SQL',
      value: '',
      isActive: true,
      type: 'string',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.port,
      description: 'Puerto SQL',
      value: '',
      isActive: true,
      type: 'number',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.instance,
      description: 'Instancia',
      value: '',
      isActive: true,
      type: 'string',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.database,
      description: 'Base de Datos',
      value: '',
      isActive: true,
      type: 'string',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.dbos,
      description: 'B. de Datos OS',
      value: '',
      isActive: true,
      type: 'string',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.user,
      description: 'Usuario',
      value: '',
      isActive: true,
      type: 'string',
    },
    {
      group: SettingGroupEnum.sqlServer,
      name: SettingNameEnum.password,
      description: 'Contraseña',
      value: '',
      isActive: true,
      type: 'string',
    },
  ]);

  const setConfLocalStore = (_iP: string, _port: string, _apiKey: string) => {
    LocalStorage.set('iP', _iP);
    LocalStorage.set('port', _port);
    LocalStorage.set('apiKey', _apiKey);
  };

  const fillConfLocalStore = () => {
    iP.value = LocalStorage.getItem('iP') || '';
    port.value = LocalStorage.getItem('port') || '';
    apiKey.value = LocalStorage.getItem('apiKey') || '';

    if (iP.value || port.value) setAxiosApiBaseUrl(`http://${iP.value}:${port.value}/api`);
  };

  const setConfiguration = (_iP: string, _port: string, _apiKey: string) => {
    iP.value = _iP;
    port.value = _port;
    apiKey.value = _apiKey;
    setConfLocalStore(_iP, _port, _apiKey);
    setAxiosApiBaseUrl(`http://${iP.value}:${port.value}/api`);
  };

  const setAxiosApiBaseUrl = (baseURL: string) => {
    api.defaults.baseURL = baseURL;
  };

  const checkConfiguration = () => {
    fillConfLocalStore();
    return !!iP.value || !!port.value || !!apiKey.value;
  };

  return {
    // state
    iP,
    port,
    apiKey,
    paramsDbConn,
    // getters

    // actions
    setConfiguration,
    checkConfiguration,
    fillConfLocalStore,
  };
});

export default useBackendConnStore;
