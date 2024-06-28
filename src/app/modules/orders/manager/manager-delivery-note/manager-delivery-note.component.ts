import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faTimes,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerOrder } from 'src/app/modules/orders/state/order.actions';
import {
  getOrderLink,
  getInvoiceLink,
} from 'src/app/modules/orders/resources/get-link-helper';
import * as fromOrderSelectors from 'src/app/modules/orders/state/order.selectors';

@Component({
  selector: 'app-manager-delivery-note',
  templateUrl: './manager-delivery-note.component.html',
  styleUrls: ['./manager-delivery-note.component.scss'],
})
export class ManagerDeliveryNoteComponent implements OnInit {
  vm$!: Observable<fromOrderSelectors.OrderViewModel>;
  @Input('id') orderId = '';
  faTimes = faTimes;
  faCheck = faCheck;
  faArrowRight = faArrowRight;
  orderLink!: string[];
  invoiceLink!: string[];
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

    this.orderLink = this.getOrderLink(this.orderId);
    this.invoiceLink = this.getInvoiceLink(this.orderId);
  }

  getOrderLink(orderId: string): string[] {
    return getOrderLink(this.role, orderId);
  }

  getInvoiceLink(orderId: string): string[] {
    return getInvoiceLink(this.role, orderId);
  }
}
