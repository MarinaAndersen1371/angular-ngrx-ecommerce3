import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/modules/tickets/state/ticket.actions';
import * as TicketSelector from 'src/app/modules/tickets/state/ticket.selectors';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.scss'],
})
export class AdminTicketsComponent implements OnInit {
  vm$!: Observable<TicketSelector.TicketsViewModel>;
  faTrash = faTrash;
  faSearch = faSearch;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(TicketSelector.selectTicketsViewModel));
    this.store.dispatch(fromTicketActions.loadAdminTickets({ role: 'admin' }));
  }

  deleteTicket(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromTicketActions.deleteTicket({ ticketId: _id }));
    }
    this.store.dispatch(fromTicketActions.loadAdminTickets({ role: 'admin' }));
  }
}
