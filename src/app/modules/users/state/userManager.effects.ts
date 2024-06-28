import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from 'src/app/modules/users/resources/user.service';
import * as UserActions from 'src/app/modules/users/state/user.actions';

@Injectable()
export class UserManagerEffects {
  updateTestScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateTestScore),
      mergeMap((action) =>
        this.userService.updateTestScore(action._id, action.testScore).pipe(
          map((user) => UserActions.updateTestScoreSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateTestScoreFailure({ error }))
          )
        )
      )
    )
  );

  updateUserCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserCoupon),
      mergeMap((action) =>
        this.userService.updateUserCoupon(action._id, action.coupon).pipe(
          map((user) => UserActions.updateUserCouponSuccess({ user })),
          catchError((error) =>
            of(UserActions.updateUserCouponFailure({ error }))
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.resetPassword),
      mergeMap((action) =>
        this.userService.resetPassword(action._id).pipe(
          map((user) => UserActions.resetPasswordSuccess({ user })),
          catchError((error) => of(UserActions.resetPasswordFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
