import {NgModule} from '@angular/core';
import { MyDynamicIonicFormComponent } from './my-dynamic-ionic-form/my-dynamic-ionic-form';
import { MyDynamicIonicFormControlComponent } from './my-dynamic-ionic-form-control/my-dynamic-ionic-form-control';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "ionic-angular";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import {DynamicFormControlComponent} from "./my-dynamic-ionic-form-control/dynamic-form-control.component";


@NgModule({
	declarations: [
	  MyDynamicIonicFormComponent,
    MyDynamicIonicFormControlComponent
  ],
	imports: [
	  CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TextMaskModule,
    DynamicFormsCoreModule
  ],
	exports: [
    DynamicFormsCoreModule,
	  MyDynamicIonicFormComponent,
    MyDynamicIonicFormControlComponent
  ]
})
export class ComponentsModule {}
