import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import { loadManagerOrder } from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-manager-return',
  templateUrl: './manager-return.component.html',
  styleUrls: ['./manager-return.component.scss'],
})
export class ManagerReturnComponent implements OnInit {
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
        loadManagerOrder({ _id: this.orderId, role: this.role })
      );
    }
  }
}
