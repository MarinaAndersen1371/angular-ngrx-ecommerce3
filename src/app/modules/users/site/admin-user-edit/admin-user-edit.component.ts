import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/users/resources/user.service';
import { updateAdminUser } from 'src/app/modules/users/state/user.actions';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss'],
})
export class AdminUserEditComponent implements OnInit {
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  model: any = {};
  role: string = 'admin';

  constructor(private store: Store<AppState>, private service: UserService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.service
        .getUser(this.userId, this.role)
        .subscribe((user) => (this.model = user));
    }
  }

  onSubmit() {
    this.store.dispatch(
      updateAdminUser({
        _id: this.userId,
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        phone: this.model.phone,
        purpose: this.model.purpose,
        birthday: this.model.birthday,
        gender: this.model.gender,
        coupon: this.model.coupon,
        testScore: this.model.testScore,
        isManager: this.model.isManager,
        isSupport: this.model.isSupport,
      })
    );
  }
}
