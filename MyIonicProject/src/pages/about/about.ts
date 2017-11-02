import { Component, ViewChild } from '@angular/core';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../item-details/item-details';
import { TabsPage } from '../tabs/tabs';
import { Http } from "@angular/http";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { NavController } from "ionic-angular";
import { GoogleFitDataProvider } from "../../providers/googlefit-data/googlefit-data";
import { Events, Nav } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    nav: NavController;

    constructor(public navController: NavController) {
       
    }
}