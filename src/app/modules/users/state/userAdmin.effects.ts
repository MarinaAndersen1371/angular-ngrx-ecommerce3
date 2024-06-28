import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from 'src/app/modules/users/resources/user.service';
import * as UserActions from 'src/app/modules/users/state/user.actions';

@Injectable()
export class UserAdminEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadAdminUsers, UserActions.loadManagerUsers),
      mergeMap((action) =>
        this.userService.getUsers(action.role).pipe(
          map(({ users, statistics }) =>
            UserActions.loadUsersSuccess({ users, statistics })
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  updateAdminUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAdminUser),
      mergeMap((action) =>
        this.userService
          .updateAdminUser(
            action._id,
            action.firstName,
            action.lastName,
            action.email,
            action.phone,
            action.purpose,
            action.birthday,
            action.gender,
            action.coupon,
            action.testScore,
            action.isManager,
            action.isSupport
          )
          .pipe(
            map((user) => UserActions.updateUserSuccess({ user })),
            catchError((error) => of(UserActions.updateUserFailure({ error })))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.removeUser(action.userId).pipe(
          map((user) => UserActions.deleteUserSuccess({ user })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
