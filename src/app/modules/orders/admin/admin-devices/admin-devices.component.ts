import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadAdminOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-devices',
  templateUrl: './admin-devices.component.html',
  styleUrls: ['./admin-devices.component.scss'],
})
export class AdminDevicesComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  faSearch = faSearch;
  role = 'admin';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadAdminOrders({ role: this.role }));
  }
}
