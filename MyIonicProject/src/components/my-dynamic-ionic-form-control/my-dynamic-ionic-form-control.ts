import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Checkbox, DateTime, TextInput, RadioGroup, Range, Select, Toggle } from "ionic-angular";

import {
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DynamicFormArrayGroupModel
} from "../../models/form-array/dynamic-form-array.model";
import {DynamicFormControlComponent, DynamicFormControlEvent} from "./dynamic-form-control.component";
import {DynamicTemplateDirective} from "@ng-dynamic-forms/core/src/directive/dynamic-template.directive";
import {DynamicFormControlModel} from "../../models/dynamic-form-control.model";
import {DynamicFormValidationService} from "@ng-dynamic-forms/core/src/service/dynamic-form-validation.service";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../../models/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER} from "../../models/datepicker/dynamic-datepicker.model";
import {DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER} from "../../models/timepicker/dynamic-timepicker.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../../models/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_GROUP} from "../../models/form-group/dynamic-form-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_INPUT} from "../../models/input/dynamic-input.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../../models/radio/dynamic-radio-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SELECT} from "../../models/select/dynamic-select.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SLIDER} from "../../models/slider/dynamic-slider.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SWITCH} from "../../models/switch/dynamic-switch.model";
import {DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA} from "../../models/textarea/dynamic-textarea.model";



/**
 * Generated class for the MyDynamicIonicFormControlComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

export const enum IonicFormControlType {

  Array = 1, //"ARRAY",
  Checkbox = 2, //"CHECKBOX",
  DateTime = 3, //"DATETIME",
  Group = 4, //"GROUP",
  Input = 5, //"INPUT",
  RadioGroup = 6, //"RADIO_GROUP",
  Range = 7, //"RANGE",
  Select = 8, //"SELECT",
  TextArea = 9, //"TEXTAREA",
  Toggle = 10, //"TOGGLE"
}

@Component({
  selector: 'my-dynamic-ionic-form-control',
  templateUrl: 'my-dynamic-ionic-form-control.html'
})
export class MyDynamicIonicFormControlComponent extends DynamicFormControlComponent implements OnChanges {

  @ContentChildren(DynamicTemplateDirective) contentTemplates: QueryList<DynamicTemplateDirective>;
  @Input("templates") inputTemplates: QueryList<DynamicTemplateDirective>;

  @Input() bindId: boolean = true;
  @Input() context: DynamicFormArrayGroupModel | null = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: DynamicFormControlModel;

  @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
  @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

  @ViewChild(Checkbox) ionCheckbox: Checkbox | undefined;
  @ViewChild(DateTime) ionDateTime: DateTime | undefined;
  @ViewChild(TextInput) ionInput: TextInput | undefined;
  @ViewChild(RadioGroup) ionRadioGroup: RadioGroup | undefined;
  @ViewChild(Range) ionRange: Range | undefined;
  @ViewChild(Select) ionSelect: Select | undefined;
  @ViewChild(Toggle) ionToggle: Toggle | undefined;

  type: IonicFormControlType | null;

  constructor(protected changeDetectorRef: ChangeDetectorRef,
              protected validationService: DynamicFormValidationService) {

    super(changeDetectorRef, validationService);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes["model"]) {
      this.type = MyDynamicIonicFormControlComponent.getFormControlType(this.model);
    }
  }

  static getFormControlType(model: DynamicFormControlModel): IonicFormControlType | null {

    switch (model.type) {

      case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
        return IonicFormControlType.Array;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
        return IonicFormControlType.Checkbox;

      case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
      case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
        return IonicFormControlType.DateTime;

      case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
      case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
        return IonicFormControlType.Group;

      case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
        return IonicFormControlType.Input;

      case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
        return IonicFormControlType.RadioGroup;

      case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
        return IonicFormControlType.Select;

      case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
        return IonicFormControlType.Range;

      case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
        return IonicFormControlType.Toggle;

      case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
        return IonicFormControlType.TextArea;

      default:
        return null;
    }
  }
}
