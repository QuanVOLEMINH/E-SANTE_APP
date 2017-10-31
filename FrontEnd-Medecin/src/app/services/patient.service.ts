import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AppSettingsService} from "./app-settings.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PatientService {
  apiUrl = this.appSettings.getApiUrl();
  constructor(public http: Http,
              public appSettings: AppSettingsService) { }

  toListResponses(responses) {
    let body = JSON.stringify(responses);
    console.log('body response is' + body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.apiUrl + 'profilPatient', body, {headers: headers})
      .map (function (response) {
        return response.json();
      })
      .catch (function (error) {
        return Observable.throw(error);
      })


  };
}
