import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerTickets } from 'src/app/modules/tickets/state/ticket.actions';
import * as TicketSelector from 'src/app/modules/tickets/state/ticket.selectors';

@Component({
  selector: 'app-manager-tickets',
  templateUrl: './manager-tickets.component.html',
  styleUrls: ['./manager-tickets.component.scss'],
})
export class ManagerTicketsComponent implements OnInit {
  vm$!: Observable<TicketSelector.TicketsViewModel>;
  faSearch = faSearch;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(TicketSelector.selectTicketsViewModel));
    this.store.dispatch(loadManagerTickets({ role: 'manager' }));
  }
}
