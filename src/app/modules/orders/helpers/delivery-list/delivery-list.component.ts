import { Component, Input } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/modules/orders/resources/orders';
import { getDeliveryNoteLink } from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent {
  @Input() orders!: Order[];
  @Input() role!: string;

  page = 1;
  pageSize = 5;
  collectionSize!: number;

  faSearch = faSearch;
  faTimes = faTimes;

  getDeliveryNoteLink(orderId: string): string[] {
    return getDeliveryNoteLink(this.role, orderId);
  }
}
