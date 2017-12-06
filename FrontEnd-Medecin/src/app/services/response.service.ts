import { Injectable } from "@angular/core";
import { AppSettingsService } from "./app-settings.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ResponseService {
  apiUrl = this.appSettings.getApiUrl();

  constructor(public http: Http, public appSettings: AppSettingsService) {}
  // GET
  // retrieve data from patient's profile
  getResponsesById(idPatient) {
    const headers = new Headers({
      "Content-Type": 'application/json',
      Accept: 'application/json'
    });
    const myParams = new URLSearchParams();
    myParams.set('idPatient', idPatient);
    const options = new RequestOptions({ headers: headers, search: myParams });

    return this.http
      .get(this.apiUrl + 'patientresponses/' + idPatient, options)
      .map(function(response) {
        return response.json();
      })
      .catch(function(error) {
        return Observable.throw(error);
      });
  }

  getListPatientById(id) {
    return this.http
      .get(this.apiUrl + 'profilPatient/' + id)
      .map(function(response) {
        return response.json();
      })
      .catch(function(error) {
        return Observable.throw(error);
      });
  }

  // GET QUESTIONS BY ID PATHOLOGY
  getListQuestionsById(idPath) {
    /*const headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    const myParams = new URLSearchParams();
    myParams.set('idPath', idPath);
    const options = new RequestOptions({ headers: headers, search: myParams });*/
    return this.http
      .get(this.apiUrl + 'pathologies/' + idPath)
      .map(function(response) {
        return response.json();
      })
      .catch(function(error) {
        return Observable.throw(error);
      });
  }
}
