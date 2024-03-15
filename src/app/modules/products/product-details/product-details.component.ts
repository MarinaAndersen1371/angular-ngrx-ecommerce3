import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { Product } from 'src/app/modules/products/resources/product';
import * as fromUserActions from 'src/app/modules/users/state/user.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Input() userId!: any;
  faCartPlus = faCartPlus;
  ngSelectWarranty = 'No';
  ngSelectGift = 'No';
  ngSelectExtra1 = 'No';
  ngSelectExtra2 = 'No';

  constructor(private router: Router, private store: Store<AppState>) {}

  addToCart(product: Product, f: NgForm): void {
    if (this.userId) {
      this.store.dispatch(
        fromUserActions.addToCart({
          _id: this.userId,
          item: product,
          qty: f.value.qty,
          warranty: f.value.warranty,
          gift: f.value.gift,
          extra1: f.value.extra1,
          extra2: f.value.extra2,
        })
      );
      this.router.navigate(['/users/user-cart', this.userId]);
    } else {
      this.router.navigate(['/users/login']);
    }
  }
}
