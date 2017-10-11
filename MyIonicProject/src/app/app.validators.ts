import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export function customValidator(control: AbstractControl): ValidationErrors | null {

  let hasError = control.value ? (control.value as string).startsWith("12") : false;

  return hasError ? {customValidator: true} : null;
}
