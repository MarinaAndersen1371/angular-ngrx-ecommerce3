import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';
import { loadAdminOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-returns',
  templateUrl: './admin-returns.component.html',
  styleUrls: ['./admin-returns.component.scss'],
})
export class AdminReturnsComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  role = 'admin';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadAdminOrders({ role: 'admin' }));
  }
}
