import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from '@full-fledged/alerts';
import { tap } from 'rxjs/operators';

import * as fromAuthActions from 'src/app/modules/users/state/auth.actions';
import * as fromMailActions from 'src/app/modules/mails/state/mail.actions';
import * as fromOrderActions from 'src/app/modules/orders/state/order.actions';
import * as fromProductActions from 'src/app/modules/products/state/product.actions';
import * as fromTicketActions from 'src/app/modules/tickets/state/ticket.actions';
import * as fromUserActions from 'src/app/modules/users/state/user.actions';

@Injectable()
export class AlertEffects {
  checkingYourInformation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginSuccess,
          fromOrderActions.createOrderSuccess
        ),
        tap(() => this.alertService.info('Be sure to check back for updates!'))
      ),
    { dispatch: false }
  );

  welcomeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) =>
          this.alertService.success(
            'Welcome Back ' + action.user.firstName + ' !'
          )
        )
      ),
    { dispatch: false }
  );

  welcome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.registerSuccess),
        tap((action) =>
          this.alertService.success('Welcome ' + action.user.firstName + ' !')
        )
      ),
    { dispatch: false }
  );

  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => this.alertService.danger('Invalid Data'))
      ),
    { dispatch: false }
  );

  unableToRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.registerFailure),
        tap(() =>
          this.alertService.danger('Invalid Data or User already exists')
        )
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.warning('You are logged out'))
      ),
    { dispatch: false }
  );

  comeBackSoon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.info('Come Back Soon!'))
      ),
    { dispatch: false }
  );

  unableToLoadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromProductActions.loadProductsFailure),
        tap(() => this.alertService.danger('Unable to load products'))
      ),
    { dispatch: false }
  );

  successFullyCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.addProductSuccess,
          fromOrderActions.createOrderSuccess,
          fromUserActions.resetPasswordSuccess,
          fromOrderActions.requestReturnSuccess
        ),
        tap(() => this.alertService.success('Successfully created!'))
      ),
    { dispatch: false }
  );

  unableToCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.addProductFailure,
          fromOrderActions.createOrderFailure,
          fromUserActions.resetPasswordFailure,
          fromUserActions.addToCartFailure,
          fromProductActions.reviewProductFailure,
          fromOrderActions.requestReturnFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger(
              'Unable to proceed, please verify data entry'
            );
          }, 500)
        )
      ),
    { dispatch: false }
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.updateProductSuccess,
          fromUserActions.updateUserSuccess,
          fromUserActions.updateProfileSuccess,
          fromUserActions.updateUserTestSuccess,
          fromUserActions.updateUserCouponSuccess,
          fromUserActions.updateTestScoreSuccess,
          fromTicketActions.updateTicketSuccess,
          fromOrderActions.updateOrderToPaidSuccess,
          fromOrderActions.updateCustomerVoucherSuccess,
          fromProductActions.reviewProductSuccess,
          fromMailActions.sendMailSuccess,
          fromTicketActions.sendMessageSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Successfully submitted!');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  unableToEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.updateProductFailure,
          fromUserActions.updateUserFailure,
          fromUserActions.updateProfileFailure,
          fromUserActions.updateUserTestFailure,
          fromUserActions.updateUserCouponFailure,
          fromUserActions.updateTestScoreFailure,
          fromTicketActions.updateTicketFailure,
          fromOrderActions.updateOrderToPaidFailure,
          fromOrderActions.updateCustomerVoucherFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger(
              'Unable to submit/edit, please verify data entry'
            );
          }, 500)
        )
      ),
    { dispatch: false }
  );

  invalidMail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromMailActions.sendMailFailure,
          fromTicketActions.sendMessageFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger(
              'Unable to send, please verify Email Address'
            );
          }, 500)
        )
      ),
    { dispatch: false }
  );

  removeProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProductSuccess,
          fromUserActions.removeFromCartSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.warning('Removed Product');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  successfullyDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProductSuccess,
          fromUserActions.deleteUserSuccess,
          fromTicketActions.deleteTicketSuccess,
          fromMailActions.deleteMailInSuccess,
          fromMailActions.deleteMailOutSuccess
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.info('Removed from List');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  unableToDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromProductActions.deleteProductFailure,
          fromUserActions.deleteUserFailure,
          fromTicketActions.deleteTicketFailure,
          fromMailActions.deleteMailInFailure,
          fromMailActions.deleteMailOutFailure
        ),
        tap(() =>
          setTimeout(() => {
            this.alertService.danger('Unable to delete');
          }, 500)
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private alertService: AlertService) {}
}
