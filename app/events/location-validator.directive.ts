import { Directive } from "@angular/core";
import { Validator, Validators, FormGroup, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[validateLocation]',
  providers: [ { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }] // multi make it intot the NG_VALIDATORS list instead of override
})
export class LocationValidator implements Validator {
  validate(control: FormGroup): { [key: string]: any } {
    let addressControl = control.controls['address'];
    let cityControl = control.controls['city'];
    let countryControl = control.controls['country'];
    // get sibling control based on parant node (root)
    let onlineUrlControl = (<FormGroup>control.root).controls['onlineUrl'];

    if ((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return { validateLocation: false };
    }
  }
}