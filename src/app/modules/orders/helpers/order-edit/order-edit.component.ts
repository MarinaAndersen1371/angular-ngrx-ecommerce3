import { Component, Input } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/modules/orders/resources/orders';
import { getOrdersLink } from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent {
  @Input() order!: Order;
  @Input() role!: string;
  @Input() sendOrder!: () => void;
  @Input() deliverOrder!: () => void;
  @Input() sendInvoice!: () => void;
  @Input() returnReceived!: () => void;
  @Input() refundPaid!: () => void;
  @Input() returnClosed!: () => void;

  faArrowLeft = faArrowLeft;

  getOrdersLink(): string[] {
    return getOrdersLink(this.role);
  }
}
