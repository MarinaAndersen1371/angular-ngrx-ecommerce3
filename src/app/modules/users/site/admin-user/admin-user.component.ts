import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowLeft,
  faArrowRight,
  faUserTie,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadAdminUser } from 'src/app/modules/users/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faUserTie = faUserTie;
  faUser = faUser;
  role: string = 'admin';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.userId) {
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(loadAdminUser({ _id: this.userId, role: this.role }));
    }
  }
}
