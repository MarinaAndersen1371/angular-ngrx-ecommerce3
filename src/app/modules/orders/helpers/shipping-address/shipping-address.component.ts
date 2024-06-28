import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss'],
})
export class ShippingAddressComponent {
  @Input() order!: Order;
}
