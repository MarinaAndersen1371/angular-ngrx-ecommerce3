import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-delivery-list-statistics',
  templateUrl: './delivery-list-statistics.component.html',
  styleUrls: ['./delivery-list-statistics.component.scss'],
})
export class DeliveryListStatisticsComponent {
  @Input() orders!: Order[];
  @Input() statistics: any;
}
