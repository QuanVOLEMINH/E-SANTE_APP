import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { PatientComponent } from "../components/patient/patient.component";
import { PatientDetailComponent } from "../components/patient-detail/patient-detail.component";
import { ChartComponent } from '../components/chart/chart.component';
import { ReportComponent } from '../components/report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'patient-detail/:id', component: PatientDetailComponent },
  { path: 'patient-detail', component: PatientDetailComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
