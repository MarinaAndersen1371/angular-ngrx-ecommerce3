import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-order-list-statistics',
  templateUrl: './order-list-statistics.component.html',
  styleUrls: ['./order-list-statistics.component.scss'],
})
export class OrderListStatisticsComponent {
  @Input() orders!: Order[];
  @Input() statistics: any;
}
