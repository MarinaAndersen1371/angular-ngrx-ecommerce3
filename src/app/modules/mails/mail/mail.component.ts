import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadMail } from 'src/app/modules/mails/state/mail.actions';
import * as fromMailSelectors from 'src/app/modules/mails/state/mail.selectors';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  vm$!: Observable<fromMailSelectors.MailViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') mailId = '';
  faArrowLeft = faArrowLeft;
  faStar = faStar;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.vmUser$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );

    if (this.mailId) {
      this.vm$ = this.store.pipe(select(fromMailSelectors.selectMailViewModel));
      this.store.dispatch(loadMail({ _id: this.mailId }));
    }
  }
}
