import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  @Input() order!: Order;
  @Input() role!: string;
  @Input() photo!: boolean;
}
