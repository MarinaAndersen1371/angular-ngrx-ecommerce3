import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getReturnLink } from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-return-list-table',
  templateUrl: './return-list-table.component.html',
  styleUrls: ['./return-list-table.component.scss'],
})
export class ReturnListTableComponent {
  @Input() orders!: Order[];
  @Input() role!: string;

  faSearch = faSearch;
  faTimes = faTimes;

  getReturnLink(orderId: string): string[] {
    return getReturnLink(this.role, orderId);
  }
}
