import { Component } from '@angular/core';
//import { Http } from "@angular/http";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { NavController } from "ionic-angular";
import { GoogleFitDataProvider } from "../../providers/googlefit-data/googlefit-data";
import { Events, NavParams } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { Health } from '@ionic-native/health';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [Health, GoogleFitDataProvider, AppAvailability]
})
export class HelloIonicPage {

  selectedItem: any;
  idPatient: number;

  constructor(public navController: NavController, public _questionService: QuestionServiceProvider, public events: Events, public googlefitData: GoogleFitDataProvider, public appAvailability: AppAvailability, public navParams: NavParams) {

    this.idPatient = this.navParams.data;
    //console.log(this.idPatient);

    let app = 'com.google.android.apps.fitness';
    this.appAvailability.check(app)
      .then(
      () => {
        this.googlefitAccess();
      },
      () => {
        setTimeout(
          () => {
            if (confirm('Pour utiliser cette application plus efficacement, acceptez-vous d\'installer le GoogleFit?')) {
              this.googlefitData.installationRequirements();
            }
          },
          2000);
      });

  }


  googlefitAccess() {
    let temp = this.googlefitData.getData().then(function (res) {
      return res;
    });
    console.log('temp in app ts is ok ');
    console.log(temp);
    temp.then(
      res => {
        if (res == 'cordova_not_available') {
          throw 'error not found googlefit';

        } else {
          if (res != null) {
            res['id'] = this.idPatient;
            // console.log('res is ');
            // console.log(res);
            this.googlefitData.sendDataToServer(res).subscribe(
              response => {
                // console.log(response);
              },
              error => {
                console.log(error);
              });
          }
        }
      }
    ).catch(e => console.log(e));
  }

}

