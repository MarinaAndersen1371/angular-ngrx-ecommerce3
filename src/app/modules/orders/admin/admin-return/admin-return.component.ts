import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import { loadAdminOrder } from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-admin-return',
  templateUrl: './admin-return.component.html',
  styleUrls: ['./admin-return.component.scss'],
})
export class AdminReturnComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  role = 'admin';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        loadAdminOrder({ _id: this.orderId, role: this.role })
      );
    }
  }
}
