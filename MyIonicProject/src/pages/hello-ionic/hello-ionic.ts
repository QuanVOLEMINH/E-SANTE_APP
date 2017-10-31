import { Component } from '@angular/core';
import { ItemDetailsPage } from '../item-details/item-details';
//import { Http } from "@angular/http";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { NavController } from "ionic-angular";
import { GoogleFitDataProvider } from "../../providers/googlefit-data/googlefit-data";
import { Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
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

  onLogin() {
    //console.log(this.user.id);
    this._questionService.getPatientInfoById(this.user.id)
      .subscribe(
      response => {
        console.log(response);
        if (response.password == this.user.password) {
          this.loginFailed = false;
          this.onClick();
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

  onClick() {
    //console.log(this.user);

    this._questionService.getListQuestionsById(this.user.id)
      .subscribe(
      response => {
        //console.log(response);
      },
      error => {
        console.log(error);
      });
    this.navController.push(ItemDetailsPage, { param1: this.user.id });

    let data = this.events.publish('myEvent');
    //console.log('data is ');
    if (data != null) {
      data['id'] = this.user.id;
      this.googlefitData.sendDataToServer(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
    //console.log(data);
  }

  showPassword() {
    this.showpass = !this.showpass;
  }
}

