import { Component } from '@angular/core';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../item-details/item-details';
import { AboutPage } from '../about/about';

import { NavParams, NavController } from 'ionic-angular';
import { QuestionServiceProvider } from "../../providers/question-service/question-service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage = HelloIonicPage;
  questionPage = ItemDetailsPage;
  contactPage = AboutPage;

  data = {};
  questionData = [];
  idPath = [];
  idPatient: number;

  tab1Root = this.homePage;
  tab2Root = this.questionPage;
  tab3Root = this.contactPage;

  constructor(public navParams: NavParams, public navController: NavController, public questionService: QuestionServiceProvider) {
    
    this.idPath = this.navParams.get('param1').idPath;
    this.idPatient = this.navParams.get('param1').idPatient;
    this.idPath.forEach(element => {
      this.questionService.getListQuestionsByIdPath(element)
        .subscribe(
        res => {
          this.questionData.push(res);
        },
        err => { console.log(err); })
    });
    this.data['idPatient'] = this.idPatient;
    this.data['idPath'] = this.idPath;
    this.data['questionData'] = this.questionData;
  }
}
