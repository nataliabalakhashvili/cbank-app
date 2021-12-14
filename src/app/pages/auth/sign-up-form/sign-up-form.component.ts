import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/helpers/validators/validators.helper";
import {NotificationsService} from "../../../core/services/notifications/notifications.service";
import {Password, passwordMap} from "../../../core/helpers/enums/password.enum";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  hide: boolean = true;
  isChecked: boolean = false;
  form: FormGroup = new FormGroup({});
  passwordStrengthLength: number = 0;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificator: NotificationsService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, [
        Validators.required,
        CustomValidators.Email
      ]],
      // phone number validator: starts with 5 and accepts only 9 numbers
      phoneNumber: [null, [
        Validators.required,
        CustomValidators.OnlyNumbers,
        CustomValidators.PhoneNumber,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]],
      password: [null, Validators.required],
      date: [null, Validators.required],
      termsCheckbox: [this.isChecked, Validators.required],
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      // notification service
      this.notificator.sayError("The form is invalid. Please make sure that all fields are correct.");
      return;
    }
    this.notificator.saySuccess("Form was submitted successfully");
  }

  checkPasswordStrength(){
    const password = this.form.value.password;
    const lowerLetters = /[a-z]+/.test(password); // If password contains lower letters
    const upperLetters = /[A-Z]+/.test(password); // If password contains upper letters
    const numbers = /[0-9]+/.test(password); // If password contains numbers
    const symbols = /[$-/:-?{-~!"^_@`\[\]]/g.test(password); // If password contains symbols
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    flags.map(item =>{
      passedMatches += item ? 1 : 0;
    });

    this.passwordStrengthLength = passedMatches * 25; // Percentage
  }

  get passwordDesc(): string {
    switch(this.passwordStrengthLength){
      case Password.short: return passwordMap[Password.short];
      case Password.weak: return passwordMap[Password.weak];
      case Password.fair: return passwordMap[Password.fair];
      case Password.good: return passwordMap[Password.short];
      default: return passwordMap[Password.strong];
    }
  }
}
