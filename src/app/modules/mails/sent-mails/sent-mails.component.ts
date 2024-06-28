import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faStar, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromMailSelectors from 'src/app/modules/mails/state/mail.selectors';

@Component({
  selector: 'app-sent-mails',
  templateUrl: './sent-mails.component.html',
  styleUrls: ['./sent-mails.component.scss'],
})
export class SentMailsComponent implements OnInit {
  vm$!: Observable<fromMailSelectors.MailsViewModel>;
  faStar = faStar;
  faTrash = faTrash;
  faSearch = faSearch;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(fromMailSelectors.selectMailsViewModel));
    this.store.dispatch(fromMailActions.loadMails());
  }

  deleteMailOut(_id: any) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(fromMailActions.deleteMailOut({ mailId: _id }));
    }
    this.store.dispatch(fromMailActions.loadMails());
  }
}
