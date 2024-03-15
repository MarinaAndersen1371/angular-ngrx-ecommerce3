import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/modules/users/resources/auth.service';

@Component({
  selector: 'app-cart-subscription',
  templateUrl: './cart-subscription.component.html',
  styleUrls: ['./cart-subscription.component.scss'],
})
export class CartSubscriptionComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  _id!: any;
  isPrime!: boolean;
  isFranchise!: boolean;
  testPaid!: boolean;
  subscription = {};
  subscriptionForm!: FormGroup;

  constructor(
    private router: Router,
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user) {
      this._id = user._id;
      this.isPrime = user.isPrime;
      this.isFranchise = user.isFranchise;
      this.testPaid = user.testPaid;
    }

    this.subscriptionForm = new FormGroup({
      prime: new FormControl(['No']),
      franchise: new FormControl(['No']),
    });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.subscription = {
        prime: this.subscriptionForm.value.prime,
        franchise: this.subscriptionForm.value.franchise,
      };
      localStorage.setItem('subscription', JSON.stringify(this.subscription));
      this.router.navigate([`/users/cart-checkout/${this._id}`]);
    }
  }
}
