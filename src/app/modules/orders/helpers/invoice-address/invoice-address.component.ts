import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';

@Component({
  selector: 'app-invoice-address',
  templateUrl: './invoice-address.component.html',
  styleUrls: ['./invoice-address.component.scss'],
})
export class InvoiceAddressComponent {
  @Input() order!: Order;
}
