import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppSettingsService} from './app-settings.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PatientService {
  apiUrl = this.appSettings.getApiUrl();

  constructor(public http: Http,
              public appSettings: AppSettingsService) {
  }

  // GET
  // retrieve data from patient's profile
  public getListPatients() {
    return this.http.get(this.apiUrl + 'profilPatient')
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }

  public getListPatientById(id) {
    return this.http.get(this.apiUrl + 'profilPatient/' + id)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }

  // POST
  // send info Patient to Back End
  public toListPatients(responses) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(responses);
    return this.http.post(this.apiUrl + 'profilPatient', body, {headers: headers})
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }

  // PUT
  // Update information of a patient
  public updatePatientById(responses) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(responses);
    return this.http.put(this.apiUrl + 'profilPatient/' + responses.id, body, {headers: headers})
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }

  // DELETE
  // remove a patient by ID
  public deletePatientById(id) {
    return this.http.delete(this.apiUrl + 'profilPatient/' + id)
      .map(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return Observable.throw(error);
      });
  }
}

