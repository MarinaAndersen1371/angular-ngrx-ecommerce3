import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  @Input() order!: Order;
  @Input() context!: string;
}
