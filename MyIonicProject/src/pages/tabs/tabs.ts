import { Component } from '@angular/core';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../item-details/item-details';
import { AboutPage } from '../about/about';

import { NavParams, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage = HelloIonicPage;
  questionPage = ItemDetailsPage; 
  contactPage = AboutPage;

  data: any;
  idPath : number;
  idPatient: number;

  tab1Root = this.homePage;
  tab2Root = this.questionPage;
  tab3Root = this.contactPage;
  //tab3Root = ContactPage;

  constructor(public navParams: NavParams, public navController: NavController) {
    this.data = this.navParams.get('param1');
    this.idPath = this.data.idPath;
    this.idPatient = this.data.idPatient;
    //console.log(this.idPath + ' ' + this.idPatient);
    //this.viewQuestion(this.idPath);
  }

  /*viewQuestion(id){
    this.navController.setRoot(this.tab2Root, {params: id});
  }
  */
}
