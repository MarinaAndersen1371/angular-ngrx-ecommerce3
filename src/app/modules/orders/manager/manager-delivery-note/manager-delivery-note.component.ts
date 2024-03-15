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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.orderId) {
      this.vm$ = this.store.pipe(
        select(fromOrderSelectors.selectOrderViewModel)
      );
      this.store.dispatch(
        loadManagerOrder({ _id: this.orderId, role: 'manager' })
      );
    }
  }
}
