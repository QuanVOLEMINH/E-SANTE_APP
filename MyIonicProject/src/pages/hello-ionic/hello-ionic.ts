import { Component } from '@angular/core';
import { ItemDetailsPage } from '../item-details/item-details';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  questionPage = ItemDetailsPage;
  constructor() {

  }

}
