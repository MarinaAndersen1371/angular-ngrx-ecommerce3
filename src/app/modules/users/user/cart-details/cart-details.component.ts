import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/modules/users/resources/auth.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  cartForm!: FormGroup;
  cart = {};
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  _id!: any;
  isPrime!: boolean;
  testPaid!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user) {
      this._id = user._id;
      this.isPrime = user.isPrime;
      this.testPaid = user.testPaid;
    }

    this.cartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      delivery: ['Standard'],
      nameInvoice: ['', [Validators.required, Validators.minLength(2)]],
      addressInvoice: ['', [Validators.required, Validators.minLength(2)]],
      cityInvoice: ['', [Validators.required, Validators.minLength(2)]],
      postalCodeInvoice: ['', [Validators.required, Validators.minLength(4)]],
      countryInvoice: ['', [Validators.required, Validators.minLength(2)]],
      method: ['', Validators.required],
      account: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.cartForm.valid) {
      this.cart = {
        name: this.cartForm.value.name,
        address: this.cartForm.value.address,
        city: this.cartForm.value.city,
        postalCode: this.cartForm.value.postalCode,
        country: this.cartForm.value.country,
        delivery: this.cartForm.value.delivery,
        nameInvoice: this.cartForm.value.nameInvoice,
        addressInvoice: this.cartForm.value.addressInvoice,
        cityInvoice: this.cartForm.value.cityInvoice,
        postalCodeInvoice: this.cartForm.value.postalCodeInvoice,
        countryInvoice: this.cartForm.value.countryInvoice,
        method: this.cartForm.value.method,
        account: this.cartForm.value.account,
      };
      localStorage.setItem('cart', JSON.stringify(this.cart));

      if (this.isPrime && this.testPaid) {
        this.router.navigate([`/users/cart-checkout/${this._id}`]);
      } else {
        this.router.navigate([`/users/cart-subscription/${this._id}`]);
      }
    }
  }
}
