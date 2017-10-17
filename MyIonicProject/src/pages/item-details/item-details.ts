import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, ToastController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicSelectModel} from "@ng-dynamic-forms/core/src/model/select/dynamic-select.model";
import {DynamicInputModel} from "@ng-dynamic-forms/core/src/model/input/dynamic-input.model";
import {DynamicRadioGroupModel} from "@ng-dynamic-forms/core/src/model/radio/dynamic-radio-group.model";
import {DynamicFormService} from "@ng-dynamic-forms/core/src/service/dynamic-form.service";
import {DynamicFormGroupModel} from "@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model";
import {DynamicDatePickerModel} from "@ng-dynamic-forms/core/src/model/datepicker/dynamic-datepicker.model";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";
import {errorHandler} from "@angular/platform-browser/src/browser";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage implements OnInit {
  @ViewChild(Slides) slider: Slides;
  selectedItem: any;
  public progress: any;

  public questions: any;
  public models;
  public formGroupList;
  public id: string;
  public message: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _formService: DynamicFormService,
              public _questionService: QuestionServiceProvider,
              public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.formGroupList = [];
    this.id = this.navParams.get('param1');
  }

  ngOnInit() {
    console.log(this.id);
    this._questionService.getListQuestionsById(this.id)
      .subscribe(
        response => {
          console.log(response);
          this.models = this.modelGenerator(response.questioncatalog);
          for (let _i = 0; _i < this.models.length; _i++) {
            let formModel = this.models[_i];
            console.log(formModel);
            this.formGroupList.push(this._formService.createFormGroup([formModel]));
          }
          //console.log(this.formGroupList);
        },
        error => {
          console.log(error);
        }
      );
    this.progress = 20;
    //this.error = this.models[0].group[0].errorMessages.required;
  }

  ionViewDidEnter() {
    this.slider.lockSwipes(false);
  }

  modelGenerator(questionsInput) {
    let group = [];
    let models = [];
    for (let formGroup in questionsInput) {
      group = [];
      for (let question in questionsInput[formGroup]['questions']) {
        switch (questionsInput[formGroup]['questions'][question]['type']) {
          case 'Input':
            group.push(new DynamicInputModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              maxLength: questionsInput[formGroup]['questions'][question]['maxlength'],
              placeholder: questionsInput[formGroup]['questions'][question]['placeholder'],
              validators: questionsInput[formGroup]['questions'][question]['validators'],
              errorMessages: questionsInput[formGroup]['questions'][question]['errorMessages']
            }));
            break;
          case 'Select':
            group.push(new DynamicSelectModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              options: questionsInput[formGroup]['questions'][question]['options'],
              validators: questionsInput[formGroup]['questions'][question]['validators'],
              errorMessages: questionsInput[formGroup]['questions'][question]['errorMessages']
            }));
            break;
          case 'Radio':
            group.push(new DynamicRadioGroupModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              options: questionsInput[formGroup]['questions'][question]['options'],
              validators: questionsInput[formGroup]['questions'][question]['validators'],
              errorMessages: questionsInput[formGroup]['questions'][question]['errorMessages']
            }));
            break;
          case 'DateTime':
            group.push(new DynamicDatePickerModel({
              id: question,
              inline: questionsInput[formGroup]['questions'][question]['inline'],
              label: questionsInput[formGroup]['questions'][question]['label'],
              placeholder: questionsInput[formGroup]['questions'][question]['placeholder'],
              validators: questionsInput[formGroup]['questions'][question]['validators'],
              errorMessages: questionsInput[formGroup]['questions'][question]['errorMessages']
            }));
            break;
        }
      }

      models.push(new DynamicFormGroupModel({
        id: formGroup,
        legend: questionsInput[formGroup]['legend'],
        group: group
      }));
    }
    return models;
  }

  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.progress = Math.round((this.slider.getActiveIndex()+1)/this.models.length*100);
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onNext(index) {
    //Lock autoSwipes to next slides
    this.progress = Math.round((this.slider.getActiveIndex()+1)/this.models.length*100);
    this.slider.slideNext();
  }

  onBack() {
    //Lock autoSwipes to previous slides
    this.slider.slidePrev();
    this.progress = Math.round(this.slider.getActiveIndex()/this.models.length*100);
    console.log(this.formGroupList);
  }

  onSubmit() {
 }

  onSave() {
    this.progress = 100;
    let arrayData = [];
    for (let index of this.formGroupList) {
      arrayData.push(index._value);
      console.log('Index', index);
    }
    //console.log(arrayData);
    // convert array to obj
    let responses = {};
    let arr = [];
    let arrTotal = [];
    for (let response of arrayData) {
      console.log('Response key', response[Object.keys(response)[0]]);
      //Convert obj to array for checking null values
      arr[Object.keys(response)[0]] = Object.keys(response[Object.keys(response)[0]]).map(function(key) {
        return response[Object.keys(response)[0]][key];
      });
      //Convert array to obj for storing data
      responses[Object.keys(response)[0]] = response[Object.keys(response)[0]]
    }
    console.log('Array', arr);
    //console.log(responses);
    let k =  0;
    for (let index in arr) {
      //console.log('INdexxxxxxxxx',typeof(arr[index][0]));
      for (let i = 0 ; i < index.length; i++) {
        arrTotal[k] = arr[index][i];
        if (arr[index][i] === null ) {
          arrTotal.push(arr[index][i]);
        }
      }
    }

    responses['id'] = this.id;
    this._questionService.toListResponses(responses)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.msg;
          this.presentToast(this.message);
        },
        error => {
          console.log(error);
        }
      );
    };
}
