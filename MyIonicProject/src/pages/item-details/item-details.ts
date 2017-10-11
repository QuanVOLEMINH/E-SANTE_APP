import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
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
  private formData: any;
  public models;
  public formGroupList;
  public id: string;
  public error: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _formService: DynamicFormService,
              public _questionService: QuestionServiceProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.formGroupList = [];
    this.formData = [];
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
          console.log(this.formGroupList);
          /*for (let index of this.formGroupList) {
            let valid = index.controls.info;
            console.log(valid);

            for (let i of valid) {
              console.log(i.validator);
            }
            //console.log(valid);
          }*/
        },
        error => {
          console.log(error);
        }
      );
    this.progress = 20;
    //this.error = this.models[0].group[0].errorMessages.required;
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
          case 'DateTime':
            group.push(new DynamicDatePickerModel({
              id: question,
              inline: questionsInput[formGroup]['questions'][question]['inline'],
              label: questionsInput[formGroup]['questions'][question]['label'],
              placeholder: questionsInput[formGroup]['questions'][question]['placeholder']
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

  onSubmit(formData) {
  }

  onNext() {
    this.progress = Math.round((this.slider.getActiveIndex()+1)/this.models.length*100);
    this.slider.slideNext();
    console.log(this.formGroupList);
  }

  onBack() {
    this.slider.slidePrev();
    this.progress = Math.round(this.slider.getActiveIndex()/this.models.length*100);
  }

  onSave() {
    this.progress = 100;
    let arrayData = [];
    for (let index of this.formGroupList) {
      arrayData.push(index._value);
      //console.log(index._value[Object.keys(index._value)[0]]);
    }
    console.log(arrayData);
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
  };
}
