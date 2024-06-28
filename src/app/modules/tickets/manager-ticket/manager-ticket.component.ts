import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/modules/tickets/state/ticket.actions';
import * as fromTicketSelector from 'src/app/modules/tickets/state/ticket.selectors';

@Component({
  selector: 'app-manager-ticket',
  templateUrl: './manager-ticket.component.html',
  styleUrls: ['./manager-ticket.component.scss'],
})
export class ManagerTicketComponent implements OnInit {
  vm$!: Observable<fromTicketSelector.TicketViewModel>;
  @Input('id') ticketId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  ngSelectStatus = 'New';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.ticketId) {
      this.vm$ = this.store.pipe(
        select(fromTicketSelector.selectTicketViewModel)
      );
      this.store.dispatch(
        fromTicketActions.loadManagerTicket({
          _id: this.ticketId,
          role: 'manager',
        })
      );
    }
  }

  openTicket() {
    this.store.dispatch(
      fromTicketActions.openManagerTicket({ _id: this.ticketId })
    );
    this.store.dispatch(
      fromTicketActions.loadManagerTicket({
        _id: this.ticketId,
        role: 'manager',
      })
    );
  }

  onSubmit(f: NgForm) {
    if (this.ticketId) {
      this.store.dispatch(
        fromTicketActions.updateManagerTicket({
          _id: this.ticketId,
          comment: f.value.commentManager,
          time: f.value.timeManager,
          status: f.value.status,
          modifiedBy: 'Manager',
        })
      );
    }
  }
}
