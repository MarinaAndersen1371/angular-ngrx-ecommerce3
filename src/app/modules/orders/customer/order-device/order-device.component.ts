import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowRight, faHome } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadOrder } from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';

@Component({
  selector: 'app-order-device',
  templateUrl: './order-device.component.html',
  styleUrls: ['./order-device.component.scss'],
})
export class OrderDeviceComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') orderId = '';
  faArrowRight = faArrowRight;
  faHome = faHome;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vmUser$ = this.store.pipe(
        select(fromAuthSelectors.selectAuthLinksViewModel)
      );
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(loadOrder({ _id: this.orderId, role: 'buy' }));
    }
  }
}
