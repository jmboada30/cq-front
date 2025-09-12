export interface UserResponse {
  data: UserItem[];
  meta: Meta;
}

export interface UserItem {
  id: number;
  email: string;
  name: string;
  roles: string;
  isActive: boolean;
  Employee: Employee | null;
}

export interface Employee {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: null;
  phone: null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  documentTypeId: number;
  userId: number;
  departmentId: number;
}

export interface Meta {
  total: number;
}

export interface UserDetail {
  id: number;
  email: string;
  name: string;
  roles: string;
  Employee: null;
  Profile: Profile;
}

export interface Profile {
  id: number;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  Permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  action: string;
  subject: string;
  type: string;
  conditions: null;
}
