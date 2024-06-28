import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { AppState } from 'src/app/store';
import { logout } from 'src/app/modules/users/state/auth.actions';
import { loadUser } from 'src/app/modules/users/state/user.actions';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';
import * as fromUserSelectors from 'src/app/modules/users/state/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HeaderComponent implements OnInit {
  vm$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  vmUser$!: Observable<fromUserSelectors.UserViewModel>;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faUserShield = faUserShield;
  status: boolean = false;
  userId?: string;
  role: string = 'buy';

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user._id) {
      this.userId = user._id;
      this.vmUser$ = this.store.pipe(
        select(fromUserSelectors.selectUserViewModel)
      );
      this.store.dispatch(loadUser({ _id: this.userId, role: this.role }));
    }

    this.vm$ = this.store.pipe(
      select(fromAuthSelectors.selectAuthLinksViewModel)
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
