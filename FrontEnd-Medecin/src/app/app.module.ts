import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MyDatePickerModule} from "mydatepicker"
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PatientService} from "./services/patient.service";
import {AppSettingsService} from "./services/app-settings.service";
import {Http, HttpModule} from "@angular/http";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MyDatePickerModule,
    TextMaskModule,
    HttpModule
  ],
  providers: [
    PatientService,
    AppSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
