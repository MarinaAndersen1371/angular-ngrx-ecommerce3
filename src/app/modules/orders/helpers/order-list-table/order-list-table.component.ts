import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import { faSearch, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  getOrderLink,
  getOrderEditLink,
} from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
  styleUrls: ['./order-list-table.component.scss'],
})
export class OrderListTableComponent {
  @Input() orders!: Order[];
  @Input() role!: string;

  page = 1;
  pageSize = 5;
  collectionSize!: number;

  faSearch = faSearch;
  faTimes = faTimes;
  faEdit = faEdit;

  getOrderLink(orderId: string): string[] {
    return getOrderLink(this.role, orderId);
  }

  getOrderEditLink(orderId: string): string[] {
    return getOrderEditLink(this.role, orderId);
  }
}
