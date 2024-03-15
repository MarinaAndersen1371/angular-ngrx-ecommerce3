import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowRight,
  faUserTie,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadUser } from 'src/app/modules/users/state/user.actions';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') userId = '';
  faArrowRight = faArrowRight;
  faUserTie = faUserTie;
  faUser = faUser;
  role: string = 'buy';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.userId) {
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(loadUser({ _id: this.userId, role: this.role }));

      this.vmUser$ = this.store.pipe(
        select(fromAuthSelectors.selectAuthLinksViewModel)
      );
    }
  }
}
