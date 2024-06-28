import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store';
import { loadManagerOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-delivery',
  templateUrl: './manager-delivery.component.html',
  styleUrls: ['./manager-delivery.component.scss'],
})
export class ManagerDeliveryComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  role = 'manager';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadManagerOrders({ role: this.role }));
  }
}
