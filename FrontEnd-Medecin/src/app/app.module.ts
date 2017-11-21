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
import {Ng2OrderModule} from "ng2-order-pipe";
import {PatientDetailComponent} from "./components/patient-detail/patient-detail.component";
import { ChartComponent } from './components/chart/chart.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    PatientDetailComponent,
    ChartComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    TextMaskModule,
    HttpModule,
    Ng2OrderModule,
    AppRoutingModule
  ],
  providers: [
    PatientService,
    AppSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
