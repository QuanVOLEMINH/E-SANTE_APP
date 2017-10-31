import {Component, OnInit} from '@angular/core';
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
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  mask: any[] = ['+', '3', '3', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  sexes = ['Homme', 'Femme'];
  pathologies = ['Pathologie 1', 'Pathologie 2', 'Pathologie 3'];
  titleAlert: string = 'This field is required';
  date: any;
  age: number;
  constructor(public formBuilder: FormBuilder,
              private _patientService: PatientService) {

  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      first: [null, [Validators.required]],
      last: [null, [Validators.required]],
      age: null,
      sexe: [null, [Validators.required]],
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



  onSubmit(data) {
    console.log(data);
    this._patientService.toListResponses(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  reset() {
    this.myForm.reset();
  }
}
