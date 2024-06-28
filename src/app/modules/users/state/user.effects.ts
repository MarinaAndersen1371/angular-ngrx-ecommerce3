import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from 'src/app/modules/users/resources/user.service';
import * as UserActions from 'src/app/modules/users/state/user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUser,
        UserActions.loadAdminUser,
        UserActions.loadManagerUser
      ),
      mergeMap((action) =>
        this.userService.getUser(action._id, action.role).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(UserActions.loadUserFailure({ error: error }))
          )
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addToCart),
      mergeMap((action) =>
        this.userService
          .addToCart(
            action._id,
            action.item,
            action.qty,
            action.warranty,
            action.gift,
            action.extra1,
            action.extra2
          )
          .pipe(
            map((user) => UserActions.addToCartSuccess({ user })),
            catchError((error) =>
              of(UserActions.addToCartFailure({ error: error }))
            )
          )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeFromCart),
      mergeMap((action) =>
        this.userService.removeFromCart(action._id, action.item).pipe(
          map((user) => UserActions.removeFromCartSuccess({ user })),
          catchError((error) =>
            of(UserActions.removeFromCartFailure({ error: error }))
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateProfile),
      mergeMap((action) =>
        this.userService
          .updateProfile(
            action._id,
            action.firstName,
            action.lastName,
            action.email,
            action.password,
            action.phone,
            action.purpose,
            action.birthday,
            action.gender
          )
          .pipe(
            map((user) => UserActions.updateProfileSuccess({ user })),
            catchError((error) =>
              of(UserActions.updateProfileFailure({ error }))
            )
          )
      )
    )
  );

  updateUserTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserTest),
      mergeMap((action) =>
        this.userService
          .updateUserTest(
            action._id,
            action.test1,
            action.test2,
            action.test3,
            action.test4,
            action.test5
          )
          .pipe(
            map((user) => UserActions.updateUserTestSuccess({ user })),
            catchError((error) =>
              of(UserActions.updateUserTestFailure({ error }))
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
