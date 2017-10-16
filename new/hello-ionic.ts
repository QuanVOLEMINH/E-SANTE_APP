import {Component} from '@angular/core';
import {ItemDetailsPage} from '../item-details/item-details';
import {Http} from "@angular/http";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {NavController} from "ionic-angular";
import {GoogleFitDataProvider} from "../../providers/googlefit-data/googlefit-data";
import {Events} from 'ionic-angular';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questionPage = ItemDetailsPage;
  public id: string;
  constructor(public navController: NavController, public _questionService: QuestionServiceProvider, public events: Events, public googlefitData: GoogleFitDataProvider) {

  }

  onClick() {
    this.navController.push(ItemDetailsPage, {param1: this.id});
    console.log(this.id);
    console.log('-------------');
    this._questionService.getListQuestionsById(this.id)
      .subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
    );

    let data =  this.events.publish('myEvent');
    console.log('x is');
    data['id'] = this.id;
    console.log(data);

    this.googlefitData.sendDataToServer(data).subscribe(
        response => {
            console.log(response);
        },
        error => {
            console.log(error);
        });
  }


}
