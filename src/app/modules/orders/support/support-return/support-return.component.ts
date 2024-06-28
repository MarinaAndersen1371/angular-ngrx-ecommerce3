import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/store';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';
import { loadSupportOrder } from 'src/app/modules/orders/state/order.actions';

@Component({
  selector: 'app-support-return',
  templateUrl: './support-return.component.html',
  styleUrls: ['./support-return.component.scss'],
})
export class SupportReturnComponent implements OnInit {
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
        loadSupportOrder({ _id: this.orderId, role: this.role })
      );
    }
  }
}
