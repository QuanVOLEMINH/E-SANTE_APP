import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";

import {DynamicFormControlModel} from "../../models/dynamic-form-control.model";
import {DynamicTemplateDirective} from "@ng-dynamic-forms/core/src/directive/dynamic-template.directive";
import {
  DynamicFormControlComponent,
  DynamicFormControlEvent, DynamicFormControlEventType
} from "../my-dynamic-ionic-form-control/dynamic-form-control.component";


export abstract class DynamicFormComponent {

    group: FormGroup;
    model: DynamicFormControlModel[];

    components: QueryList<DynamicFormControlComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    onEvent($event: DynamicFormControlEvent, type: DynamicFormControlEventType) {

        switch (type) {

            case DynamicFormControlEventType.Blur:
                this.blur.emit($event);
                break;

            case DynamicFormControlEventType.Change:
                this.change.emit($event);
                break;

            case DynamicFormControlEventType.Focus:
                this.focus.emit($event);
                break;
        }
    }
}
