import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettingsProvider} from "../app-settings/app-settings";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Subject} from "rxjs/Subject";

/*
  Generated class for the QuestionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QuestionServiceProvider {
  apiUrl = this.appSettings.getApiUrl();
  constructor(public http: Http, public appSettings: AppSettingsProvider) {
    console.log('Hello QuestionServiceProvider Provider');
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

  getListQuestionsById(idPatient: any) {
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let myParams = new URLSearchParams();
    myParams.set('idPatient', idPatient);
    let options = new RequestOptions({headers: headers, search: myParams});
    return this.http.get(this.apiUrl + 'patients/' + idPatient, options)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  };

 /* toListQuestionsById(patientId: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = JSON.stringify(patientId);
    return this.http.post(this.apiUrl + 'patients', body, {headers: headers})
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  };
*/
  toListResponses(responses) {
    let body = JSON.stringify(responses);
    //console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.apiUrl + 'responses', body, {headers: headers})
      .map (function (response) {
        return response.json();
      })
      .catch (function (error) {
        return Observable.throw(error);
      })


  };

/*  addListQuestions(questions) {
    let body = JSON.stringify(questions);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'questions', body, headers)
      .map(function (response) {
        return response;
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }*/
}
