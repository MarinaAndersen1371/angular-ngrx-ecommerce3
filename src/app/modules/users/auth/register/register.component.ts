import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { registerPage } from 'src/app/modules/users/state/auth.actions';
import { passwordMatchValidator } from 'src/app/modules/users/resources/helpers';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: [''],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        purpose: ['Other'],
        birthday: ['', Validators.required],
        gender: ['Male'],
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(
        registerPage({
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName,
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.password,
          phone: this.registrationForm.value.phone,
          purpose: this.registrationForm.value.purpose,
          birthday: this.registrationForm.value.birthday,
          gender: this.registrationForm.value.gender,
        })
      );
    }
  }
}
