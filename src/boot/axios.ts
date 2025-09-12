import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { LocalStorage } from 'quasar';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const baseURL = process.env.DEV ? process.env.BASE_URL : process.env.BASE_URL_PROD;

const api = axios.create({ baseURL: baseURL || 'http://0.0.0.0:3022/api' });

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

// add a request interceptor
api.interceptors.request.use(function (config) {
  const jwt = LocalStorage.getItem<string>('jwt');
  if (jwt) config.headers.Authorization = `Bearer ${jwt}`;

  const apiKey = LocalStorage.getItem<string>('apiKey');
  if (apiKey) config.headers.set('x-apikey', apiKey);

  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { api };
