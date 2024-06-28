import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-order-edit',
  templateUrl: './manager-order-edit.component.html',
  styleUrls: ['./manager-order-edit.component.scss'],
})
export class ManagerOrderEditComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  role = 'manager';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  sendOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerOrderToSent({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  deliverOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerOrderToDelivered({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  sendInvoice() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerInvoiceToSent({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  returnReceived() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerReturnToReceived({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  refundPaid() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerRefundToPaid({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  returnClosed() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateManagerReturnToClosed({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadManagerOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }
}
