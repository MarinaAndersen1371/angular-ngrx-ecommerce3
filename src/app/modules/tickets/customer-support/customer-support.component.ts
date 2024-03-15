import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { sendMessage } from 'src/app/modules/tickets/state/ticket.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.store.dispatch(
        sendMessage({
          name: this.customerForm.value.name,
          email: this.customerForm.value.email,
          category: this.customerForm.value.category,
          message: this.customerForm.value.message,
        })
      );
      this.customerForm.reset();
    }
  }
}
