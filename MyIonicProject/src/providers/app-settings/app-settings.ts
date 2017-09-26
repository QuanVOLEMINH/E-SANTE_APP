import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const CONFIG = {
  apiUrl: 'http://127.0.0.1:3001/'
  //debug on laptop: 127.0.0.1 (localhost)
  //on mobile: connect to the same wifi -> use laptop's ip address in THIS WIFI (192.168.1.113)
}
/*
  Generated class for the AppSettingsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppSettingsProvider {

  constructor() {}

  getApiUrl() {
    return CONFIG.apiUrl;
  }

}
