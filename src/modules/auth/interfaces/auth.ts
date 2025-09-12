export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export type UserRole = 'super' | 'admin' | 'user';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  roles: UserRole;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileId: number;
  Profile: Profile;
  jwt: string;
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
