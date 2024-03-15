import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss'],
})
export class VoucherFormComponent {
  @Input() orderId!: string;
  @Input() userId!: string;
  @Input() userCoupon!: string;
  faCheck = faCheck;

  constructor(private store: Store<AppState>) {}

  submitVoucher(userId: string, f: NgForm) {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateCustomerVoucher({
          _id: this.orderId,
          userId,
          voucher: f.value.voucher,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'buy' })
      );
    }
  }
}
