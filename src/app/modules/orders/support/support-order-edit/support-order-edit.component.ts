import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-support-order-edit',
  templateUrl: './support-order-edit.component.html',
  styleUrls: ['./support-order-edit.component.scss'],
})
export class SupportOrderEditComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  role = 'support';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  sendOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateSupportOrderToSent({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  deliverOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateSupportOrderToDelivered({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  returnReceived() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateSupportReturnToReceived({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  refundPaid() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateSupportRefundToPaid({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }

  returnClosed() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateSupportReturnToClosed({
          _id: this.orderId,
          role: this.role,
        })
      );
      this.store.dispatch(
        fromOrderActions.loadSupportOrder({
          _id: this.orderId,
          role: this.role,
        })
      );
    }
  }
}
