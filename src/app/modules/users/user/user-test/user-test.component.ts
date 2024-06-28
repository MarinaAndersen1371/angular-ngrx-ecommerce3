import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/store';
import { UserService } from 'src/app/modules/users/resources/user.service';
import { updateUserTest } from 'src/app/modules/users/state/user.actions';
import * as fromAuthSelectors from 'src/app/modules/users/state/auth.selectors';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss'],
})
export class UserTestComponent implements OnInit {
  vmUser$!: Observable<fromAuthSelectors.AuthLinksViewModal>;
  @Input('id') userId = '';
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faEdit = faEdit;
  faCheck = faCheck;
  active = 1;
  model: any = {};
  test1!: string;
  test2!: string;
  test3!: string;
  test4!: string;
  test5!: string;
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

  onSubmit() {
    this.store.dispatch(
      updateUserTest({
        _id: this.userId,
        test1: this.model.test.test1,
        test2: this.model.test.test2,
        test3: this.model.test.test3,
        test4: this.model.test.test4,
        test5: this.model.test.test5,
      })
    );
  }

  areAllTestsZero(model: any): boolean {
    const tests = ['test1', 'test2', 'test3', 'test4', 'test5'];
    return tests.some((test) => model.test[test] === '00');
  }
}
