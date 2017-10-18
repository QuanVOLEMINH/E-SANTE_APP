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
    if (this.id != null) this.id.replace(/\s/g, '');
    if (this.id != null && this.id) {
      this.navController.push(ItemDetailsPage, {param1: this.id});
      this._questionService.getListQuestionsById(this.id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
        let data =  this.events.publish('myEvent');
        console.log('data is ');
        if (data != null ){
          data['id'] = this.id;
          this.googlefitData.sendDataToServer(data).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
          }
          console.log(data);
        } else {
          alert('Please fill out ID information!');
        }
      }

}
