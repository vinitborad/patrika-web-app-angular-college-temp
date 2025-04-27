import { Injectable } from '@angular/core';

export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  googleAuthClientId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: EnvironmentConfig = {
    production: false,
    apiUrl: 'https://api.patrikaprinters.com',
    googleAuthClientId: 'your-google-client-id'
  };

  constructor() { }

  get<T extends keyof EnvironmentConfig>(key: T): EnvironmentConfig[T] {
    return this.config[key];
  }
}