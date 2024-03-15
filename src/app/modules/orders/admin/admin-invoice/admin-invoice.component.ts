import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadAdminOrder } from 'src/app/modules/orders/state/order.actions';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrls: ['./admin-invoice.component.scss'],
})
export class AdminInvoiceComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  faArrowRight = faArrowRight;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(loadAdminOrder({ _id: this.orderId, role: 'admin' }));
    }
  }
}
