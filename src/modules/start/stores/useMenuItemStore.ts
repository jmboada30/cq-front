import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { MenuItem } from '../interfaces/menuItem';

// interface MenuItemState {
//   menuItemsMaster: MenuItem[];
//   menuItems: MenuItem[];
//   menuItemsOperations: MenuItem[];
// }

export const useMenuItemStore = defineStore('menuItem', () => {
  // Estado reactivo
  const menuItemsMaster = ref<MenuItem[]>([
    // {
    //   title: 'Marcas',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_list_alt',
    //   link: 'master/brands',
    // },
    // {
    //   title: 'Categorías',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_category',
    //   link: 'master/categories',
    // },
    // {
    //   title: 'Rutas',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_alt_route',
    //   link: 'master/routes',
    // },
    // {
    //   title: 'Documentos',
    //   caption: 'Doc de identidad',
    //   icon: 'sym_r_contact_page',
    //   link: 'master/documentTypes',
    // },
    // {
    //   title: 'Sub Categorías',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_inventory_2',
    //   link: 'master/subcategories',
    // },
    // {
    //   title: 'Departamentos',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_source_environment',
    //   link: 'master/departments',
    // },
    // {
    //   title: 'Zonas',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_source_environment',
    //   link: 'master/zones',
    // },
    // {
    //   title: 'Sedes',
    //   caption: 'Tablas maestras',
    //   icon: 'sym_r_source_environment',
    //   link: 'master/branch',
    // },
  ]);

  const menuItems = ref<MenuItem[]>([
    // {
    //   title: 'Perfiles',
    //   caption: 'Manejo de perfiles',
    //   icon: 'sym_r_group_add',
    //   canAccess: false,
    //   link: 'profile',
    // },
    // {
    //   title: 'Principales',
    //   caption: 'Tablas administrativas',
    //   icon: 'sym_r_description',
    //   subMenu: true,
    // },
    // {
    //   title: 'Empleados',
    //   caption: 'Registro de empleados',
    //   icon: 'sym_r_groups',
    //   link: 'employee/employees',
    // },
    // {
    //   title: 'Artículos',
    //   caption: 'Gestión de artículos',
    //   icon: 'sym_r_devices_other',
    //   link: 'asset/assets',
    // },
    // {
    //   title: 'Operaciones',
    //   caption: 'Operaciones de almacén',
    //   icon: 'sym_r_rebase',
    //   subMenu: true,
    // },
    // {
    //   title: 'Guías de despacho',
    //   caption: 'Gestión de guías',
    //   icon: 'sym_r_inventory_2',
    //   link: 'orderBasket',
    // },
    {
      title: 'Productos',
      caption: 'Productos',
      icon: 'sym_r_devices_other',
      link: 'products',
    },
  ]);

  const menuItemsOperations = ref<MenuItem[]>([
    // {
    //   title: 'Almacenes',
    //   caption: 'Almacenes de la empresa',
    //   icon: 'sym_r_warehouse',
    //   link: 'operations/warehouses',
    // },
    // {
    //   title: 'Generales',
    //   caption: 'Listado de operaciones',
    //   icon: 'sym_r_preview',
    //   link: 'operations',
    // },
    // {
    //   title: 'Entradas',
    //   caption: 'Ingresos de productos',
    //   icon: 'sym_r_input',
    //   link: 'operations/receipt',
    // },
    // {
    //   title: 'Transferencias',
    //   caption: 'Transferencias de productos',
    //   icon: 'sym_r_move_up',
    //   link: 'operations/transfers',
    // },
    // {
    //   title: 'Salidas',
    //   caption: 'Salidas de productos',
    //   icon: 'sym_r_output',
    //   link: 'operations/issues',
    // },
  ]);

  // Métodos
  const setMenuItems = (items: MenuItem[]) => {
    menuItemsMaster.value = items;
  };

  const clearState = () => {
    menuItemsMaster.value = [];
  };

  // Retornar lo que necesites exponer
  return {
    menuItemsMaster,
    menuItems,
    menuItemsOperations,
    setMenuItems,
    clearState,
  };
});
