import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/users/resources/user.service';
import { updateProfile } from 'src/app/modules/users/state/user.actions';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;
  model: any = {};
  role: string = 'buy';

  constructor(private store: Store<AppState>, private service: UserService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.vmUser$ = this.store.pipe(
        select(fromAuthSelectors.selectAuthLinksViewModel)
      );

      this.service
        .getUser(this.userId, this.role)
        .subscribe((user) => (this.model = user));
    }
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      updateProfile({
        _id: this.userId,
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        password: f.value.password,
        phone: this.model.phone,
        purpose: this.model.purpose,
        birthday: this.model.birthday,
        gender: this.model.gender,
      })
    );
  }
}
