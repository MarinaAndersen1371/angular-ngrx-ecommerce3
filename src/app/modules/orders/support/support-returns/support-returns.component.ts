import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch,
  faTimes,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadSupportOrders } from 'src/app/modules/orders/state/order.actions';
import * as OrderSelector from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-support-returns',
  templateUrl: './support-returns.component.html',
  styleUrls: ['./support-returns.component.scss'],
})
export class SupportReturnsComponent implements OnInit {
  vm$!: Observable<OrderSelector.OrdersViewModel>;
  faSearch = faSearch;
  faTimes = faTimes;
  faBoxOpen = faBoxOpen;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(OrderSelector.selectOrdersViewModel));
    this.store.dispatch(loadSupportOrders({ role: 'support' }));
  }
}
