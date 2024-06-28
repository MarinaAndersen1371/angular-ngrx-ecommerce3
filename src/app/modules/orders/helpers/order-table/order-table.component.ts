import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import { getDeviceProtectionLink } from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  @Input() order!: Order;
  @Input() role!: string;
  @Input() photo!: boolean;
  @Input() context!: string;

  getDeviceProtectionLink(orderId: string): string[] {
    return getDeviceProtectionLink(this.role, orderId);
  }
}
