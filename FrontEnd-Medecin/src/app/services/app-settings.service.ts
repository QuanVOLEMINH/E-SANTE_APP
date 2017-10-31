import { Injectable } from '@angular/core';
const CONFIG = {
  apiUrl: 'http://localhost:3001/'
}

@Injectable()
export class AppSettingsService {

  constructor() { }

  getApiUrl() {
    return CONFIG.apiUrl;
  }

}
