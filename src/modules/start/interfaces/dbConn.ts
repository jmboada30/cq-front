export interface CheckDbConn {
  baseURL?: string;
  apiKey: string;
}

export interface CheckQr {
  apiKey: string;
  server: string;
  port: string;
}

export interface DBConn {
  server: string;
  port: string;
  instance: string;
  user: string;
  password: string;
  database: string;
  dbos: string;
  isExpiration: string;
  isCanTienda: string;
  isUnifiedView: string;
}
