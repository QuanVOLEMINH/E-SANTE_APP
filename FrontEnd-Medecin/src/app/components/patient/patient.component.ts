import { Component, OnInit, Pipe } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { NgProgress } from 'ngx-progressbar';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';


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
  // For multi-choices questions
  genders = ['Homme', 'Femme'];
  maritals = ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'];
  pathologies = ['Pathologie 1', 'Pathologie 2', 'Pathologie 3'];
  // pathologies: any;
  public checks = [
    { description: 'Pathology 1', value: '1' },
    { description: 'Pathology 2', value: '2' },
    { description: 'Pathology 3', value: '3' }
  ];
  titleRequire = 'This field is required';
  date: any;
  age: number;
  interval: any;
  patientList: any;
  currentPatient: any;
  isDeleted: boolean;

  validationMessages: any = {
    'first': {
      'required': 'First name is required.',
      'pattern': 'First name is invalid'
    },
    'last': {
      'required': 'Last name is required.',
      'pattern': 'Last name is invalid'
    },
    'gender': {
      'required': 'Gender is required.'
    },
    'email': {
      'email': 'Please input a valid email.'
    },
    'phone': {
      'required': 'Phone number is required.'
    },
    'maritalStatus': {
      'required': 'Marital Status is required.'
    },
    'address': {
      'required': 'Address is required.'
    },
    'city': {
      'pattern': 'Name of this city is invalid'
    },
    'zip': {
      'pattern': 'Zip code is invalid'
    },
    'id': {
      'required': 'ID is required.',
      'pattern': 'ID is invalid'
    },
    'pathology': {
      'required': 'Pathology is required.'
    },
    'socialSecurityNumber': {
      'required': 'Social Security Number is required',
      'pattern': 'Social Security Number is invalid'
    },
    'medicalDoctor': {
      'required': 'Medical Doctor is required.',
      'pattern': 'Name is invalid'
    },
    'phoneDoctor': {
      'required': 'Phone number is required.'
    },
    'insuredName': {
      'required': 'Name is required.',
      'pattern': 'Name is invalid'
    }
  };

  constructor(public formBuilder: FormBuilder,
    public ngProgress: NgProgress,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
    private _patientService: PatientService,
    private route: Router) {
    this.isDeleted = false;
    this._toastyConfig.theme = 'material';
    /*const defaultPathologies = ['Pathologie 1'];
    this.myForm = this.formBuilder.group(
      pathology: this.formBuilder.array(this.pathologies.map(x => defaultPathologies.indexOf(x) > -1)));*/
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      first: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      last: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      age: null,
      gender: [null, [Validators.required]],
      myDate: [null],
      email: [
        null,
        [
          Validators.email
          // Validators.pattern('^[a-z0-9!#$%&\'*+\\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$')
        ]
      ],
      phone: [null, [Validators.required]],
      maritalStatus: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.pattern(/^[a-zA-Z ]+$/)]],
      zip: [null, [Validators.pattern(/^\d+$/)]],
      id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      pathology: this.formBuilder.array([]),
      socialSecurityNumber: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      occupation: [null],
      employer: [null],
      employerPhoneNumber: [null],
      medicalDoctor: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      phoneDoctor: [null, [Validators.required]],
      insuredName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      insCompany: [null],
      relationWithPatient: [null],
      insCompanyAddress: [null],
      insCompanyCity: [null],
      insCompanyZip: [null]
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
    }, 5000);
  }

  refreshData() {
    this._patientService.getListPatients()
      .subscribe(
      response => {
        // console.log(response.length);
        this.patientList = response;
        // console.log(this.patientList);
      },
      error => {
        console.log(error);
      }
      );
  }

  onChange(event) {
    // console.log(event);
    const pathologies = <FormArray>this.myForm.get('pathology') as FormArray;
    const group = [];
    if (this.myForm.get(event.target.value)) {
      this.myForm.patchValue({ [event.target.value]: event.target.value });
    }
    // console.log(this.myForm);
    if (event.target.checked) {
      pathologies.push(new FormControl(event.target.value));
      // this.myForm.get['pathology'].patchValue(event.target.value);
    } else {
      let i = 0;
      pathologies.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          pathologies.removeAt(i);
          return;
        }
        i++;
      });
      /*const i = pathologies.controls.findIndex(x => x.value === event.target.value);
      pathologies.removeAt(i);*/
    }
    // console.log(pathologies);
  }
  setDate(): void {
    // Set today date using the patchValue function
    const date = new Date();
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
    // Convert from date of birth to age
    if (this.myForm.controls['myDate'].value != null) {
      const dob = this.myForm.controls['myDate'].value;
      const year = dob['date']['year'];
      const month = dob['date']['month'];
      const day = dob['date']['day'];
      // The month as an number between 0 and 11 (January to December).
      const birthday = new Date(year, month - 1, day);
      const timeDiff = Date.now() - birthday.getTime();
      const cal = Math.round(timeDiff / (1000 * 24 * 3600));
      const ageDate = new Date(timeDiff);
      this.age = Math.abs(ageDate.getFullYear() - 1970);
      this.myForm.controls['age'].setValue(this.age);
    }
    // bind age to View
    /* this.age = Math.abs(ageDate.getUTCFullYear()-1970);
    console.log(this.age);*/
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({ myDate: null });
  }

  // Add new patient to database
  onCreate(data) {
    console.log(data);
    this._patientService.toListPatients(data)
      .subscribe(
      response => {
        // console.log(response);
        this.addToast('SUCCESS', response.msg, 'success');
      },
      error => {
        console.log(error);
        this.addToast('ERROR', '', 'error');
      }
      );
    // this.refreshData();
  }
  // Reset value of New Form
  reset() {
    this.myForm.reset();
  }
  // Get All List Patient
  onBacktoList() {
    this._patientService.getListPatients()
      .subscribe(
      response => {
        // console.log(response);
      },
      error => {
        console.log(error);
      }
      );
    this.currentPatient = null;
  }
  // Get List Patient by ID
  onGetListById(id) {
    this._patientService.getListPatientById(id)
      .subscribe(
      response => {
        // console.log(response);
        this.currentPatient = response;
      },
      error => {
        console.log(error);
        this.addToast('ERROR', error._body, 'error');
      }
      );
    this.isDeleted = false;
    this.modifyForm.reset();
  }
  // DELETE by ID Patient
  onDelete(id) {
    console.log(id);
    // Loading process
    this.ngProgress.start();
    this._patientService.deletePatientById(id)
      .subscribe(
      response => {
        const index = this.patientList.indexOf(this.deleteForm.value, 0);
        if (index > -1) {
          this.patientList.splice(index, 1);
        }
        this.ngProgress.done();
        setTimeout(() => {
          this.addToast('SUCCESS', response.msg, 'success');
        }, 3500);

        // console.log(response);
      },
      error => {
        console.log(error);
        this.ngProgress.done();
        this.addToast('ERROR', error._body, 'error');
      }
      );
    this.deleteForm.reset();
    this.isDeleted = true;
    this.currentPatient = null;
    // this.refreshData();
  }
  // Create a notification for each action
  addToast(title, msg, type) {
    // Create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 3000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    switch (type) {
      case 'default': this._toastyService.default(toastOptions); break;
      case 'info': this._toastyService.info(toastOptions); break;
      case 'success': this._toastyService.success(toastOptions); break;
      case 'wait': this._toastyService.wait(toastOptions); break;
      case 'error': this._toastyService.error(toastOptions); break;
      case 'warning': this._toastyService.warning(toastOptions); break;
    }
    // this._toastyService.error(toastOptions);
  }

  onNavigate(routeValue) {
    this.route.navigate(routeValue);
  }
}
