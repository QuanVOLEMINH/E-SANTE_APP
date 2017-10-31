import { Component } from '@angular/core';
import { ItemDetailsPage } from '../item-details/item-details';
import { Http } from "@angular/http";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { NavController } from "ionic-angular";
import { GoogleFitDataProvider } from "../../providers/googlefit-data/googlefit-data";
import { Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    questionPage = ItemDetailsPage;
    loginForm: FormGroup;
    loginFailed: boolean = false;
    user = {
        id: '',
        password: ''
    };

    showpass: boolean = false;

    constructor(public navController: NavController, public _questionService: QuestionServiceProvider, public events: Events, public googlefitData: GoogleFitDataProvider, public formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            id: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-]*'), Validators.required])],
            password: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_-]*'), Validators.required])]
        });
    }

    login(){
        alert('to implement');
    }
}