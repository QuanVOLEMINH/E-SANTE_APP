import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from "ng2-toasty";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {

  public myForm: FormGroup;
  patient: any;
  first: string;
  idPatient: number;
  age: number;
  genders = ['Homme', 'Femme'];
  maritals = ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'];
  pathologies = ['Pathologie 1', 'Pathologie 2', 'Pathologie 3'];
  public checks = [
    { description: 'Pathology 1', value: '1' },
    { description: 'Pathology 2', value: '2' },
    { description: 'Pathology 3', value: '3' }
  ];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  mask: any[] = ['+', '3', '3', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

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
  private sub: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
    private _patientService: PatientService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idPatient = +params['id'];
      console.log(this.idPatient);
    });
    this._patientService.getListPatientById(this.idPatient)
      .subscribe(
      response => {
        // console.log(response);
        this.patient = response;
        this.first = this.patient._source.first;
        this.setValue();
      },
      error => {
        console.log(error);
      }
      );
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

  onChange(event) {
    console.log(event);
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
    console.log(pathologies);
  }
  setValue() {
    this.myForm.setValue({
      first: this.patient['_source']['first'],
      last: this.patient['_source']['last'],
      age: this.patient['_source']['age'],
      gender: this.patient['_source']['gender'],
      myDate: this.patient['_source']['myDate'],
      email: this.patient['_source']['email'],
      phone: this.patient['_source']['phone'],
      maritalStatus: this.patient['_source']['maritalStatus'],
      address: this.patient['_source']['address'],
      city: this.patient['_source']['city'],
      zip: this.patient['_source']['zip'],
      id: this.patient['_source']['id'],
      pathology: this.patient['_source']['pathology'],
      socialSecurityNumber: this.patient['_source']['socialSecurityNumber'],
      occupation: this.patient['_source']['occupation'],
      employer: this.patient['_source']['employer'],
      employerPhoneNumber: this.patient['_source']['employerPhoneNumber'],
      medicalDoctor: this.patient['_source']['medicalDoctor'],
      phoneDoctor: this.patient['_source']['phoneDoctor'],
      insuredName: this.patient['_source']['insuredName'],
      insCompany: this.patient['_source']['insCompany'],
      relationWithPatient: this.patient['_source']['relationWithPatient'],
      insCompanyAddress: this.patient['_source']['insCompanyAddress'],
      insCompanyCity: this.patient['_source']['insCompanyCity'],
      insCompanyZip: this.patient['_source']['insCompanyZip']
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSave(data) {
    // Update the new information of an user
    console.log(data);
    this._patientService.updatePatientById(data)
      .subscribe(
      response => {
        this.addToast('SUCCESS', response.msg, 'success');
        // console.log(response.msg);
      },
      error => {
        console.log(error);
      }
      );
    // this.refreshData();
  }

  addToast(title, msg, type) {
    // Create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
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
}
