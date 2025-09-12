export enum SettingNameEnum {
  server = 'server',
  dbos = 'dbos',
  port = 'port',
  instance = 'instance',
  database = 'database',
  user = 'user',
  password = 'password',
}

export type SettingName = keyof typeof SettingNameEnum;

export enum SettingGroupEnum {
  sqlServer = 'sql_server',
  general = 'general',
}

export interface CreateSettingDto {
  group: SettingGroupEnum;
  name: SettingNameEnum;
  value: string;
  description: string;
  isActive: boolean;
  type: 'string' | 'number';
}

export type UpdateSettingDto = Partial<CreateSettingDto>;

export interface Setting extends CreateSettingDto {
  id: number;
}
