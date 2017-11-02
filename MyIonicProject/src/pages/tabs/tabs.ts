import { Component } from '@angular/core';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../item-details/item-details';
import { NavParams, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage = HelloIonicPage;
  questionPage = ItemDetailsPage; 
  idPath = 2;
  tab1Root = this.homePage;
  tab2Root = this.questionPage;
  //tab3Root = ContactPage;

  constructor(public navParams: NavParams, public navController: NavController) {
    this.idPath = this.navParams.get('param1');
    console.log('param at tab ' + this.idPath);
    //this.viewQuestion(this.idPath);
  }

  /*viewQuestion(id){
    this.navController.setRoot(this.tab2Root, {params: id});
  }
  */
}
