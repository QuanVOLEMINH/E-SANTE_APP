import {Component, OnInit, Pipe} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../services/patient.service";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public myForm: FormGroup;
  public modifyForm: FormGroup;
  public deleteForm: FormGroup;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  mask: any[] = ['+', '3', '3', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  genders = ['Homme', 'Femme'];
  pathologies = ['Pathologie 1', 'Pathologie 2', 'Pathologie 3'];
  titleAlert: string = 'This field is required';
  date: any;
  age: number;
  interval: any;
  patientList: any;
  currentPatient: any;
  isDeleted: boolean;

  constructor(public formBuilder: FormBuilder,
              private _patientService: PatientService) {
    this.isDeleted = false;
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      first: [null, [Validators.required]],
      last: [null, [Validators.required]],
      age: null,
      gender: [null, [Validators.required]],
      myDate: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9!#$%&\'*+\\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$')
        ]
      ],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      id: [null, [Validators.required]],
      pathology: [null, [Validators.required]]
    });

    this.modifyForm = this.formBuilder.group({
      id: [null, [Validators.required]]
    });

    this.deleteForm = this.formBuilder.group({
      id: [null, [Validators.required]]
    });

    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000)
  }

  refreshData() {
    this._patientService.getListPatients()
      .subscribe(
        response => {
          console.log(response.length);
          this.patientList = response;
          console.log(this.patientList)
        },
        error => {
          console.log(error);
        }
      );
  }
  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  calculateAge() {
    //convert from date of birth to age
    let dob = this.myForm.controls['myDate'].value;
    let year = dob['date']['year'];
    let month = dob['date']['month'];
    let day = dob['date']['day'];
    let birthday = new Date(year,month,day);
    let timeDiff = Date.now() - birthday.getTime();
    let ageDate = new Date(timeDiff);
    this.age = Math.abs(ageDate.getUTCFullYear()-1970);
    this.myForm.controls['age'].setValue(this.age);
    //bind age to View
    /*this.age = Math.abs(ageDate.getUTCFullYear()-1970);
    console.log(this.age);*/
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
  }

  //Add new patient to database
  onSubmit(data) {
    console.log(data);
    this._patientService.toListPatients(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    //this.refreshData();
  }
  //Reset value of New Form
  reset() {
    this.myForm.reset();
  }
  //Get All List Patient
  onGetList() {
    this._patientService.getListPatients()
      .subscribe(
        response => {
          console.log(response);
    },
        error => {
          console.log(error);
        }
      )
  }
  //Get List Patient by ID
  onGetListById(id) {
    this._patientService.getListPatientById(id)
      .subscribe(
        response => {
          console.log(response);
          this.currentPatient = response;
        },
        error => {
          console.log(error);
        }
      );
    this.isDeleted = false;
    this.modifyForm.reset();
  }
  //DELETE by ID Patient
  onDelete(id) {
    console.log(id);
    this._patientService.deletePatientById(id)
      .subscribe(
        response => {
          var index = this.patientList.indexOf(this.deleteForm.value, 0);
          if (index > -1) {
            this.patientList.splice(index, 1);
          }
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    this.deleteForm.reset();
    this.isDeleted = true;
    this.currentPatient = null;
    //this.refreshData();
  }
}
