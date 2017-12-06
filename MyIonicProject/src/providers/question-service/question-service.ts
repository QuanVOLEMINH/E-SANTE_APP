import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettingsProvider } from "../app-settings/app-settings";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

/*
  Generated class for the QuestionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QuestionServiceProvider {
  apiUrl = this.appSettings.getApiUrl();
  constructor(public http: Http, public appSettings: AppSettingsProvider) {
    //console.log('Hello QuestionServiceProvider Provider');
  }


  getListQuestions() {
    return this.http.get(this.apiUrl + 'patients')
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  };

  //GET QUESTIONS BY ID PATHOLOGY
  getListQuestionsByIdPath(idPath) {
    return this.http.get(this.apiUrl + 'pathologies/' + idPath)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  };

  toListResponses(responses) {
    //console.log('response is '+ responses);
    let body = JSON.stringify(responses);
    console.log('body response is ' + body);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl + 'responses', body, { headers: headers })
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      })
  };

  getPatientInfoById(idPatient) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let myParams = new URLSearchParams();
    myParams.set('idPatient', idPatient);
    let options = new RequestOptions({ headers: headers, search: myParams });
    return this.http.get(this.apiUrl + 'profilpatients/' + idPatient, options)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }

  /*getResponsesById(idPatient, date: String){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let myParams = new URLSearchParams();
    myParams.set('idPatient', idPatient);
    let options = new RequestOptions({ headers: headers, search: myParams });
    return this.http.get(this.apiUrl + 'patientresponses/' + idPatient + '/' + date, options)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }*/
}
