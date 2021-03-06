import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicSelectModel } from "@ng-dynamic-forms/core/src/model/select/dynamic-select.model";
import { DynamicInputModel } from "@ng-dynamic-forms/core/src/model/input/dynamic-input.model";
import { DynamicRadioGroupModel } from "@ng-dynamic-forms/core/src/model/radio/dynamic-radio-group.model";
import { DynamicFormService } from "@ng-dynamic-forms/core/src/service/dynamic-form.service";
import { DynamicFormGroupModel } from "@ng-dynamic-forms/core/src/model/form-group/dynamic-form-group.model";
import { DynamicDatePickerModel } from "@ng-dynamic-forms/core/src/model/datepicker/dynamic-datepicker.model";
import { QuestionServiceProvider } from "../../providers/question-service/question-service";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { DynamicSliderModel } from "../../models/slider/dynamic-slider.model";

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
  public idPath: string;
  public idPatient: string;
  public message: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private _formService: DynamicFormService,
    public _questionService: QuestionServiceProvider,
    public toastCtrl: ToastController) {
    this.formGroupList = [];
    this.idPatient = this.navParams.data['idPatient'];
    this.idPath = this.navParams.data['idPath'];
  }

  ngOnInit() {

    //Add only when not exist
    function addUnique(data, key, value) {
      if (data[key] == undefined) data[key] = value;
    }
    // console.log(this.navParams.data);
    let temp = this.navParams.data['questionData'];
    let data = temp[0]['_source']['questioncatalog'];

    //Build data
    for (let i = 1; i < temp.length; i++) {
      for (const key in temp[i]['_source']['questioncatalog']) {
        addUnique(data, key, temp[i]['_source']['questioncatalog'][key]);
        for (const keyQuestion in temp[i]['_source']['questioncatalog'][key]['questions']) {
          addUnique(data[key]['questions'], keyQuestion, temp[i]['_source']['questioncatalog'][key]['questions'][keyQuestion]);
        }
      }
    }
     console.log(data);

    //Generate models
    this.models = this.modelGenerator(data);
    for (let _i = 0; _i < this.models.length; _i++) {
      let formModel = this.models[_i];
      // console.log(formModel);
      this.formGroupList.push(this._formService.createFormGroup([formModel]));
    }

    this.progress = 20;
  }

  ionViewDidEnter() {
    this.slider.lockSwipes(true);
  }

  modelGenerator(questionsInput) {
    // console.log(questionsInput);
    let group = [];
    let models = [];
    for (let formGroup in questionsInput) {
      // console.log(formGroup);
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
          case 'Range':
            group.push(new DynamicSliderModel({
              id: question,
              label: questionsInput[formGroup]['questions'][question]['label'],
              min: questionsInput[formGroup]['questions'][question]['min'],
              max: questionsInput[formGroup]['questions'][question]['max'],
              step: questionsInput[formGroup]['questions'][question]['step'],
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
    this.progress = Math.round((this.slider.getActiveIndex() + 1) / this.models.length * 100);
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }

  onNext(index) {
    //Lock autoSwipes to next slides
    this.progress = Math.round((this.slider.getActiveIndex() + 1) / this.models.length * 100);
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.slider.lockSwipes(true);
  }

  onBack() {
    //Lock autoSwipes to previous slides
    this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
    this.progress = Math.round(this.slider.getActiveIndex() / this.models.length * 100);
    console.log(this.formGroupList);
  }

  onSubmit() {
  }

  onSave() {
    this.progress = 100;
    let arrayData = [];
    for (let index of this.formGroupList) {
      arrayData.push(index._value);
      // console.log('Index', index);
    }
    //console.log(arrayData);
    // convert array to obj
    let responses = {};
    let arr = [];
    let arrTotal = [];
    for (let response of arrayData) {
      //console.log('Response key', response[Object.keys(response)[0]]);
      //Convert obj to array for checking null values
      arr[Object.keys(response)[0]] = Object.keys(response[Object.keys(response)[0]]).map(function (key) {
        return response[Object.keys(response)[0]][key];
      });
      //Convert array to obj for storing data
      responses[Object.keys(response)[0]] = response[Object.keys(response)[0]]
    }
    //console.log('Array', arr);

    let k = 0;
    for (let index in arr) {
      //console.log('Indexxxxxxxxx',typeof(arr[index][0]));
      for (let i = 0; i < index.length; i++) {
        arrTotal[k] = arr[index][i];
        if (arr[index][i] === null) {
          arrTotal.push(arr[index][i]);
        }
      }
    }
    responses['idPatient'] = this.idPatient;
    responses['idPath'] = this.idPath;

    console.log(responses);

    const alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Avez-vous confirmé tous vos réponses?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            // console.log('Submit clicked');
            this._questionService.toListResponses(responses)
              .subscribe(
              response => {
                // console.log(response);
                this.message = response.msg;
                this.presentToast(this.message);
              },
              error => {
                console.log(error);
              }
              );
          }
        }
      ]
    });
    alert.present();


  };
}
