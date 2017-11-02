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
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    nav: NavController;

    homePage = HelloIonicPage;
    questionPage = ItemDetailsPage;
    tabPages = TabsPage;
    loginForm: FormGroup;
    loginFailed: boolean = false;
    user = {
        id: '',
        password: ''
    };
    showpass: boolean = false;

    constructor(public navController: NavController, public _questionService: QuestionServiceProvider, public events: Events, public googlefitData: GoogleFitDataProvider, public formBuilder: FormBuilder) {
        this.nav = navController;
        this.loginForm = this.formBuilder.group({
            id: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-]*'), Validators.required])],
            password: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-]*'), Validators.required])]
        });
    }

    login() {
        
        //console.log(this.user.id);
        this._questionService.getPatientInfoById(this.user.id)
            .subscribe(
            response => {
                //console.log(response);
                if (response.password == this.user.password) {
                    this.loginFailed = false;
                    let idPath = response.pathology.charAt(response.pathology.length - 1);
                    this.nav.setRoot(this.tabPages, { param1: idPath });
                    //console.log(idPath);
                    //this.onClick(idPath);

                } else {
                    this.loginFailed = true;
                }
                ;
            },
            error => {
                console.log('Error' + error);
                this.loginFailed = true;
            });

    }

    showPassword() {
        this.showpass = !this.showpass;
    }
}