import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const CONFIG = {
  apiUrl: 'http://192.168.1.113:3001/'
  //debug on laptop: 127.0.0.1 (localhost)
  //on mobile: connect to the same wifi -> use laptop's ip address in THIS WIFI (192.168.1.113)
}

@Injectable()
export class AppSettingsProvider {

  constructor() { }

  getApiUrl() {
    return CONFIG.apiUrl;
  }

}
