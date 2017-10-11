import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

/**
 * Generated class for the ValidationMessageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({

  selector: 'validation-message',
  templateUrl: 'validation-message.html'
})

export class ValidationMessageComponent {

  @Input() control: FormControl;
  text: string;

  constructor() {
    console.log('Hello ValidationMessageComponent Component');
    this.text = 'Hello World';
  }

}
