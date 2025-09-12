export interface MenuItem {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  subMenu?: boolean;
  canAccess?: boolean;
}
