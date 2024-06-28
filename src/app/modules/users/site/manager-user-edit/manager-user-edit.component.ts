import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  faArrowLeft,
  faEdit,
  faArrowRight,
  faLock,
  faEnvelopeSquare,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/users/resources/user.service';
import { randomString } from 'src/app/modules/users/resources/helpers';
import * as fromUserActions from 'src/app/modules/users/state/user.actions';

@Component({
  selector: 'app-manager-user-edit',
  templateUrl: './manager-user-edit.component.html',
  styleUrls: ['./manager-user-edit.component.scss'],
})
export class ManagerUserEditComponent implements OnInit {
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  faArrowRight = faArrowRight;
  faEnvelopeSquare = faEnvelopeSquare;
  faLock = faLock;
  model: any = {};
  generatedCoupon: any = '';
  reset: boolean = false;
  randomString = randomString;
  role: string = 'manager';

  constructor(private store: Store<AppState>, private service: UserService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.service
        .getUser(this.userId, this.role)
        .subscribe((user) => (this.model = user));
    }
  }

  updateTestScore() {
    this.store.dispatch(
      fromUserActions.updateTestScore({
        _id: this.userId,
        testScore: this.model.testScore,
      })
    );
  }

  updateUserCoupon() {
    this.store.dispatch(
      fromUserActions.updateUserCoupon({
        _id: this.userId,
        coupon: this.model.coupon,
      })
    );
  }

  onClick() {
    this.generatedCoupon = this.randomString(10);
  }

  resetPassword() {
    this.store.dispatch(
      fromUserActions.resetPassword({
        _id: this.userId,
      })
    );
    this.reset = true;
  }
}
