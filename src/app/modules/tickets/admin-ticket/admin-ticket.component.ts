import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromTicketActions from 'src/app/modules/tickets/state/ticket.actions';
import * as fromTicketSelectors from 'src/app/modules/tickets/state/ticket.selectors';

@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.scss'],
})
export class AdminTicketComponent implements OnInit {
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
        fromTicketActions.loadAdminTicket({ _id: this.ticketId, role: 'admin' })
      );
    }
  }

  openTicket() {
    this.store.dispatch(
      fromTicketActions.openAdminTicket({ _id: this.ticketId })
    );
    this.store.dispatch(
      fromTicketActions.loadAdminTicket({ _id: this.ticketId, role: 'admin' })
    );
  }

  onSubmit(f: NgForm) {
    if (this.ticketId) {
      this.store.dispatch(
        fromTicketActions.updateAdminTicket({
          _id: this.ticketId,
          comment: f.value.commentAdmin,
          time: f.value.timeAdmin,
          status: f.value.status,
          modifiedBy: 'Admin',
        })
      );
    }
  }
}
