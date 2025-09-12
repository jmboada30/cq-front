import type { LocationQueryRaw } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import useNotify from 'src/modules/shared/composables/useNotify';

interface RouteNotificationParams {
  message?: string;
  type?: 'success' | 'error';
  name: string;
  urlParams?: Record<string, string | number>;
  queryParams?: LocationQueryRaw;
}

export const useModifyRoute = () => {
  const router = useRouter();
  const route = useRoute(); // Obtiene la ruta reactiva actual
  const { successNotify, errorNotify } = useNotify();

  // Computed para mantener los datos actualizados
  const currentRoute = computed(() => ({
    name: route.name,
    query: route.query,
    params: route.params,
    path: route.path,
  }));

  const replaceUrl = (newQueryParams: Record<string, string | number>, url?: string) => {
    try {
      if (!newQueryParams || typeof newQueryParams !== 'object') {
        console.error('newQueryParams must be an object');
        return;
      }

      const routeName = url ?? (route.name as string);

      if (!routeName) {
        console.error('Route name is not defined');
        return;
      }

      // Si el nombre de la ruta es diferente al actual, redirigir a la nueva ruta sin agregar al historial
      if (routeName !== route.name) {
        return router.replace({
          name: routeName,
          query: { ...route.query, ...newQueryParams },
        });
      }

      // Si el nombre de la ruta es el mismo, reemplazar la URL actual
      void router.replace({
        name: routeName,
        query: { ...route.query, ...newQueryParams },
      });
    } catch (error) {
      console.error('Failed to replace URL:', error);
    }
  };

  const removeQueryParams = (paramsToRemove: string[]) => {
    const newQueryParams = { ...route.query };

    paramsToRemove.forEach((param) => {
      delete newQueryParams[param]; // Elimina el parámetro de la copia del query
    });

    void router.replace({
      name: route.name as string,
      query: { ...newQueryParams }, // Actualiza la URL sin los parámetros eliminados
    });
  };

  const redirect = (param: RouteNotificationParams) => {
    const { message, type, name, queryParams } = param;

    if (type === 'success') {
      successNotify(message!);
    } else if (type === 'error') {
      errorNotify(message!);
    } else if (type === 'none') {
      //
    }
    return router.push({
      name,
      query: { ...queryParams },
      params: { ...param.urlParams },
    });
  };

  const goBack = () => {
    router.back();
  };

  return {
    currentRoute,
    replaceUrl,
    removeQueryParams,
    redirect,
    goBack,
  };
};
