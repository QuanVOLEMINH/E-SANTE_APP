import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../services/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IMyDpOptions} from "mydatepicker";

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
  genders = ['Homme', 'Femme'];
  pathologies = ['Pathologie 1', 'Pathologie 2', 'Pathologie 3'];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  mask: any[] = ['+', '3', '3', ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  private sub: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public formBuilder: FormBuilder,
              private _patientService: PatientService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idPatient = +params['id'];
      console.log(this.idPatient);
    });
    this._patientService.getListPatientById(this.idPatient)
      .subscribe(
        response => {
          console.log(response);
          this.patient = response;
          this.first = this.patient._source.first;
          this.setValue();
        },
        error => {
          console.log(error);
        }
      );
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
      address: this.patient['_source']['address'],
      city: this.patient['_source']['city'],
      zip: this.patient['_source']['zip'],
      id: this.patient['_source']['id'],
      pathology: this.patient['_source']['pathology']
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
