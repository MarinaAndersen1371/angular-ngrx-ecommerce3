import { Component, Input } from '@angular/core';
import { Order } from 'src/app/modules/orders/resources/orders';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delivery-note-table',
  templateUrl: './delivery-note-table.component.html',
  styleUrls: ['./delivery-note-table.component.scss'],
})
export class DeliveryNoteTableComponent {
  @Input() order!: Order;

  faTimes = faTimes;
  faCheck = faCheck;
}
