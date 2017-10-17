import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";

import {MyDynamicIonicFormControlComponent} from "../my-dynamic-ionic-form-control/my-dynamic-ionic-form-control";
import {DynamicFormComponent} from "./dynamic-form-component";
import {DynamicFormControlModel} from "../../models/dynamic-form-control.model";
import {DynamicFormControlEvent} from "../my-dynamic-ionic-form-control/dynamic-form-control.component";
import {DynamicTemplateDirective} from "@ng-dynamic-forms/core/src/directive/dynamic-template.directive";

/**
 * Generated class for the MyDynamicIonicFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'my-dynamic-ionic-form',
  templateUrl: 'my-dynamic-ionic-form.html'
})
export class MyDynamicIonicFormComponent extends DynamicFormComponent {

  @Input() group: FormGroup;
  @Input() model: DynamicFormControlModel[];

  @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

  @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

  @ViewChildren(MyDynamicIonicFormControlComponent) components: QueryList<MyDynamicIonicFormControlComponent>;
}
