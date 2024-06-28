import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/modules/tickets/state/ticket.actions';
import * as fromTicketSelectors from 'src/app/modules/tickets/state/ticket.selectors';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss'],
})
export class SupportTicketComponent implements OnInit {
  vm$!: Observable<fromTicketSelectors.TicketViewModel>;
  @Input('id') ticketId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  ngSelectStatus = 'New';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.ticketId) {
      this.vm$ = this.store.pipe(
        select(fromTicketSelectors.selectTicketViewModel)
      );
      this.store.dispatch(
        fromTicketActions.loadSupportTicket({
          _id: this.ticketId,
          role: 'support',
        })
      );
    }
  }

  openTicket() {
    this.store.dispatch(
      fromTicketActions.openSupportTicket({ _id: this.ticketId })
    );
    this.store.dispatch(
      fromTicketActions.loadSupportTicket({
        _id: this.ticketId,
        role: 'support',
      })
    );
  }

  onSubmit(f: NgForm) {
    if (this.ticketId) {
      this.store.dispatch(
        fromTicketActions.updateSupportTicket({
          _id: this.ticketId,
          comment: f.value.commentSupport,
          time: f.value.timeSupport,
          status: f.value.status,
          modifiedBy: 'Support',
        })
      );
    }
  }
}
