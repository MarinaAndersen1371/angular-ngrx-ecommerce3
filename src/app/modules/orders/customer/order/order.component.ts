import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') orderId = '';
  faArrowRight = faArrowRight;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vmUser$ = this.store.pipe(
        select(fromAuthSelectors.selectAuthLinksViewModel)
      );
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        fromOrderActions.loadOrder({ _id: this.orderId, role: 'buy' })
      );
    }
  }

  payOrder() {
    if (this.orderId) {
      this.store.dispatch(
        fromOrderActions.updateOrderToPaid({ _id: this.orderId })
      );
    }
  }
}
