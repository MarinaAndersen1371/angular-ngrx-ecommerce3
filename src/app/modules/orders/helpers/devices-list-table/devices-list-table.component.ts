import { Component, Input } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/modules/orders/resources/orders';
import { getDeviceProtectionLink } from 'src/app/modules/orders/resources/get-link-helper';

@Component({
  selector: 'app-devices-list-table',
  templateUrl: './devices-list-table.component.html',
  styleUrls: ['./devices-list-table.component.scss'],
})
export class DevicesListTableComponent {
  @Input() orders!: Order[];
  @Input() statistics: any;
  @Input() role!: string;

  faSearch = faSearch;

  getDeviceProtectionLink(orderId: string): string[] {
    return getDeviceProtectionLink(this.role, orderId);
  }
}
