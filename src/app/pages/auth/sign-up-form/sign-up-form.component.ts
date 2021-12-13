import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/helpers/validators.helper";
import {NotificationsService} from "../../../core/services/notifications/notifications.service";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private notificator: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, [
        Validators.required,
        CustomValidators.OnlyNumbers,
        CustomValidators.PhoneNumber,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]],
      password: [null, Validators.required],
      date: [null,  Validators.required],
      termsCheckbox: [false],
    })
  }

  onSubmit() {
    console.log('form value => ', this.form.value);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.notificator.sayError("ფორმა არაა ვალიდური, შეავსეთ ველები სწორად");
      return;
    }
  }
}
