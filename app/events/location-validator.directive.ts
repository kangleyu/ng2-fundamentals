import { Directive } from "@angular/core";
import { FormGroup, NG_VALIDATORS, Validator, Validators } from "@angular/forms";

@Directive({
  selector: "[validateLocation]",
  // multi make it intot the NG_VALIDATORS list instead of override
  providers: [ { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }],
})
export class LocationValidator implements Validator {
  public validate(control: FormGroup): { [key: string]: any } {
    const addressControl = control.controls["address"];
    const cityControl = control.controls["city"];
    const countryControl = control.controls["country"];
    // get sibling control based on parant node (root)
    const onlineUrlControl = (control.root as FormGroup).controls["onlineUrl"];

    if ((addressControl && addressControl.value
    && cityControl && cityControl.value
    && countryControl && countryControl.value)
    || (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return { validateLocation: false };
    }
  }
}
