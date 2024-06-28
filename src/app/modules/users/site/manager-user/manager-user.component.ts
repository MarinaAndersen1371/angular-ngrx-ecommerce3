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
import { loadManagerUser } from 'src/app/modules/users/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.scss'],
})
export class ManagerUserComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faUserTie = faUserTie;
  faUser = faUser;
  faArrowRight = faArrowRight;
  role: string = 'manager';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.userId) {
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(
        loadManagerUser({ _id: this.userId, role: this.role })
      );
    }
  }
}
