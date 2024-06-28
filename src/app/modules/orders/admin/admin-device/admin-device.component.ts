import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadAdminOrder } from 'src/app/modules/orders/state/order.actions';
import { getOrderLink } from 'src/app/modules/orders/resources/get-link-helper';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-admin-device',
  templateUrl: './admin-device.component.html',
  styleUrls: ['./admin-device.component.scss'],
})
export class AdminDeviceComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  faArrowRight = faArrowRight;
  orderLink!: string[];
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

    this.orderLink = this.getOrderLink(this.orderId);
  }

  getOrderLink(orderId: string): string[] {
    return getOrderLink(this.role, orderId);
  }
}
