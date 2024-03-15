import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-order-edit',
  templateUrl: './admin-order-edit.component.html',
  styleUrls: ['./admin-order-edit.component.scss'],
})
export class AdminOrderEditComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  faArrowLeft = faArrowLeft;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  sendOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminOrderToSent({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  deliverOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminOrderToDelivered({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  sendInvoice() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminInvoiceToSent({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  returnReceived() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminReturnToReceived({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  refundPaid() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminRefundToPaid({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }

  returnClosed() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateAdminReturnToClosed({
          _id: this.orderId,
          role: 'admin',
        })
      );
      this.store.dispatch(
        fromOrderActions.loadAdminOrder({ _id: this.orderId, role: 'admin' })
      );
    }
  }
}
