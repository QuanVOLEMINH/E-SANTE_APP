import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettingsProvider} from "../app-settings/app-settings";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Subject} from "rxjs/Subject";
import { Health, HealthData } from '@ionic-native/health';

@Injectable()
export class GoogleFitDataProvider {
  apiUrl = this.appSettings.getApiUrl();
  constructor(public http: Http, public appSettings: AppSettingsProvider, private health: Health) {
    //console.log('GoogleFitDataProvider');
  }

  installationRequirements() {
    this.health.promptInstallFit().then(res => {
      console.log(res);
      console.log('Successfully demand');
    })
    .catch(err => {
      console.log(err);
      console.log('Not Successfully demand');
    });
  }
  getData() {



    return this.health.isAvailable()
    .then((available) => {
      //console.log("This api is " + available);
      return this.health.requestAuthorization([
        {
          read: ['steps', 'height', 'calories', 'distance', 'activity']      //read only permission
        }
      ])
      .then(res => {
        console.log(res);
        console.log('can authorize');
        var startDate = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
        var endDate = new Date();
        return this.health.queryAggregated({startDate, endDate, dataType: 'distance', bucket: 'day'})
        .then((data) => {
          console.log(data);
          console.log('query successed');
          return data;
        })
        .catch(e => {
          console.log(e);
          console.log('query failed');
          return e;
        });
      })
      .catch(e => {
        console.log(e);
        console.log('can not authorize');
        return e;
      });
    }).catch(e => {
      console.log(e);
      console.log('Not found');
      return e;
    });
  }

  sendDataToServer(data) {
    console.log('data to send');
    console.log(data);
    let temp = new Object();
    for (let i = 0; i < Object.keys(data).length; i++){
      temp[i] = data[i];
    }
    temp['id'] = data['id'];
    console.log(temp);
    let body = JSON.stringify(temp);
    console.log('body is: ');
    console.log(body);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + 'ggfit', body, options).map (function (response) {
      return response.json();
    })
    .catch (function (error) {
      return Observable.throw(error);
    });
  }
}
