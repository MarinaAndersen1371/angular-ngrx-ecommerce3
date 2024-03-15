import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faStoreAlt,
  faBoxOpen,
  faTrash,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import * as fromUserActions from 'src/app/modules/users/state/user.actions';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  vm$!: Observable<fromUserSelectors.UserViewModel>;
  faArrowRight = faArrowRight;
  faStoreAlt = faStoreAlt;
  faBoxOpen = faBoxOpen;
  faTrash = faTrash;
  userId!: any;
  role: string = 'buy';

  constructor(
    private store: Store<AppState>,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user) {
      this.userId = user._id;
      this.vm$ = this.store.pipe(select(fromUserSelectors.selectUserViewModel));
      this.store.dispatch(
        fromUserActions.loadUser({ _id: this.userId, role: this.role })
      );
    }
  }

  deleteItem(product: any): void {
    if (this.userId) {
      if (confirm('Are you sure?')) {
        this.store.dispatch(
          fromUserActions.removeFromCart({ _id: this.userId, item: product })
        );
      }
    }
  }
}
