import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuestionServiceProvider } from '../providers/question-service/question-service';

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsIonicUIModule } from "@ng-dynamic-forms/ui-ionic";
import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { DynamicFormService } from "@ng-dynamic-forms/core/src/service/dynamic-form.service";
import { DynamicFormValidationService } from "@ng-dynamic-forms/core/src/service/dynamic-form-validation.service";
import { HttpModule } from "@angular/http";
import { NG_VALIDATORS } from "@angular/forms";
import { customValidator } from "./app.validators";
import { ComponentsModule } from "../components/components.module";
import { CommonModule } from "@angular/common";
import { MyDynamicIonicFormComponent } from "../components/my-dynamic-ionic-form/my-dynamic-ionic-form";
import { MyDynamicIonicFormControlComponent } from "../components/my-dynamic-ionic-form-control/my-dynamic-ionic-form-control";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: true
    }),
    DynamicFormsCoreModule.forRoot(),
    ComponentsModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QuestionServiceProvider,
    AppSettingsProvider,
    DynamicFormService,
    DynamicFormValidationService,
    { provide: NG_VALIDATORS, useValue: customValidator, multi: true }
  ]
})
export class AppModule { }
