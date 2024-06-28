import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { loadManagerUsers } from 'src/app/modules/users/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-manager-primelist',
  templateUrl: './manager-primelist.component.html',
  styleUrls: ['./manager-primelist.component.scss'],
})
export class ManagerPrimelistComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UsersViewModel>;
  faSearch = faSearch;
  faTimes = faTimes;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.vm$ = this.store.pipe(select(fromUserSelectors.selectUsersViewModel));
    this.store.dispatch(loadManagerUsers({ role: 'manager' }));
  }
}
