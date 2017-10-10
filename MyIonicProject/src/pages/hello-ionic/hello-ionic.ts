import { Component } from '@angular/core';
import { ItemDetailsPage } from '../item-details/item-details';
import {Http} from "@angular/http";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {NavController} from "ionic-angular";
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questionPage = ItemDetailsPage;
  public id: string;
  constructor(public navController: NavController, public _questionService: QuestionServiceProvider) {

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
      )
  }
}
