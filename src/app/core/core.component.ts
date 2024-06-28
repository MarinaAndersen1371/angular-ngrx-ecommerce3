import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/modules/users/resources/user';
import { AppState } from 'src/app/store';
import { browserReload } from 'src/app/modules/users/state/auth.actions';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  faPaperPlane = faPaperPlane;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        this.store.dispatch(browserReload({ user }));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }
}
