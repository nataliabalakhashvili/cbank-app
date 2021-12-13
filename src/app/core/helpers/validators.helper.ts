import { ValidationErrors } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static OnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^[0-9]+$");

      if (!regex.test(control.value)) {
        return { onlyNumbers: true };
      }
    }
    return null;
  }

  static PhoneNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^5[0-9].*$");

      if (!regex.test(control.value)) {
        return { Mobile: true };
      }
    }

    return null;
  }
}
