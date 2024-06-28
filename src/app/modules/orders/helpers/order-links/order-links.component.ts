import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import {
  getInvoiceLink,
  getDeliveryNoteLink,
  getDeviceProtectionLink,
  getReturnLink,
} from 'src/app/modules/orders/resources/get-link-helper';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-links',
  templateUrl: './order-links.component.html',
  styleUrls: ['./order-links.component.scss'],
})
export class OrderLinksComponent {
  @Input() order!: Order;
  @Input() role!: string;

  faArrowRight = faArrowRight;

  getInvoiceLink(orderId: string): string[] {
    return getInvoiceLink(this.role, orderId);
  }

  getDeliveryNoteLink(orderId: string): string[] {
    return getDeliveryNoteLink(this.role, orderId);
  }

  getDeviceProtectionLink(orderId: string): string[] {
    return getDeviceProtectionLink(this.role, orderId);
  }

  getReturnLink(orderId: string): string[] {
    return getReturnLink(this.role, orderId);
  }
}
