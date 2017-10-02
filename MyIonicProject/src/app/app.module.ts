import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuestionServiceProvider } from '../providers/question-service/question-service';

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsIonicUIModule } from "@ng-dynamic-forms/ui-ionic";
import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import {DynamicFormService} from "@ng-dynamic-forms/core/src/service/dynamic-form.service";
import {DynamicFormValidationService} from "@ng-dynamic-forms/core/src/service/dynamic-form-validation.service";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: true}),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsIonicUIModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuestionServiceProvider,
    AppSettingsProvider,
    DynamicFormService,
    DynamicFormValidationService
  ]
})
export class AppModule {}
