export interface BasicDropDown {
  value: number;
  label: string;
}

export interface DropDown {
  value: number | string;
  label: string;
  extraSlot?: number | string;
}

export type ResourceDD = 'banks' | 'menu-items' | 'menu-items-drop-down';

export type ResourceDDById = 'assets-by-warehouse';
