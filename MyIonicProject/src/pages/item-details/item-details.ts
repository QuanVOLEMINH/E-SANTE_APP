import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import {FormGroup} from "@angular/forms";
import {DynamicSelectModel} from "@ng-dynamic-forms/core/src/model/select/dynamic-select.model";
import {DynamicInputModel} from "@ng-dynamic-forms/core/src/model/input/dynamic-input.model";
import {DynamicRadioGroupModel} from "@ng-dynamic-forms/core/src/model/radio/dynamic-radio-group.model";
import {DynamicFormService} from "@ng-dynamic-forms/core/src/service/dynamic-form.service";
import {DynamicFormGroupModel} from "@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model";
import {QUESTIONS_DATA} from "./item-details.model";
import {QuestionServiceProvider} from "../../providers/question-service/question-service";

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage implements OnInit {
  @ViewChild(Slides) slider: Slides;
  selectedItem: any;

  public questions: any;
  private formData: any;
  change: boolean;
  public models;
  public formGroupList;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _formService: DynamicFormService,
              public _questionService: QuestionServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.formGroupList = [];
    this.formData = [];
  }

  ngOnInit() {
    this._questionService.getListQuestions()
      .subscribe(
        response => {
          console.log(response);
          this.models = this.modelGenerator(response);
          for (let _i = 0; _i < this.models.length; _i++) {
            let formModel = this.models[_i];
            this.formGroupList.push(this._formService.createFormGroup([formModel]));
          }
          console.log(this.formGroupList);
        },
        error => {
          console.log(error);
        }
      );
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
              placeholder: questionsInput[formGroup]['questions'][question]['placeholder']
            }));
            break;
          case 'Select':
            group.push(new DynamicSelectModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              options: questionsInput[formGroup]['questions'][question]['options']
            }));
            break;
          case 'Radio':
            group.push(new DynamicRadioGroupModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              options: questionsInput[formGroup]['questions'][question]['options']
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

  onSubmit(formData) {
  }

  onClick() {
    return this.change = !this.change;
  }

  onNext() {
    this.slider.slideNext();
  }

  onBack() {
    this.slider.slidePrev();
  }

  onSave() {
    let arrayData = [];
    for (let index of this.formGroupList) {
      arrayData.push(index._value);
      //console.log(index._value[Object.keys(index._value)[0]]);
    }
    console.log(arrayData)
    // convert array to obj
    let responses = {};
    for (let response of arrayData) {
      //console.log(Object.keys(responses));
      //console.log(responses[Object.keys(response)[0]]);
      responses[Object.keys(response)[0]] = response[Object.keys(response)[0]]
    }
    console.log(responses);
    this._questionService.toListResponses(responses)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
