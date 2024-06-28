import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import { getOrderLink } from 'src/app/modules/orders/resources/get-link-helper';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-return-table',
  templateUrl: './return-table.component.html',
  styleUrls: ['./return-table.component.scss'],
})
export class ReturnTableComponent {
  @Input() order!: Order;
  @Input() role!: string;

  faArrowRight = faArrowRight;

  getOrderLink(orderId: string): string[] {
    return getOrderLink(this.role, orderId);
  }
}
