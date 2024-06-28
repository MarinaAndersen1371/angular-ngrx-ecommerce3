import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderService } from 'src/app/modules/orders/resources/order.service';
import * as orderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class OrderEffects {
  loadMyOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.loadMyOrders),
      mergeMap(() =>
        this.orderService.getMyOrders().pipe(
          map((orders) => orderActions.loadOrdersSuccess(orders)),
          catchError((error) => of(orderActions.loadOrdersFailure({ error })))
        )
      )
    );
  });

  loadMyOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrder),
      mergeMap((action) =>
        this.orderService.getMyOrder(action._id).pipe(
          map((order) => orderActions.loadOrderSuccess({ order })),
          catchError((error) =>
            of(orderActions.loadOrderFailure({ error: error }))
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.createOrder),
      concatMap((action) =>
        this.orderService
          .createOrder(
            action._id,
            action.name,
            action.address,
            action.city,
            action.postalCode,
            action.country,
            action.delivery,
            action.nameInvoice,
            action.addressInvoice,
            action.cityInvoice,
            action.postalCodeInvoice,
            action.countryInvoice,
            action.method,
            action.account,
            action.prime,
            action.franchise
          )
          .pipe(
            map((order) => orderActions.createOrderSuccess({ order })),
            catchError((error) =>
              of(orderActions.createOrderFailure({ error }))
            )
          )
      )
    )
  );

  updateOrderToPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateOrderToPaid),
      mergeMap((action) =>
        this.orderService.updateOrderToPaid(action._id).pipe(
          map((order) => orderActions.updateOrderToPaidSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToPaidFailure({ error }))
          )
        )
      )
    )
  );

  updateCustomerVoucher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.updateCustomerVoucher),
      mergeMap((action) =>
        this.orderService
          .updateCustomerVoucher(action._id, action.userId, action.voucher)
          .pipe(
            map((order) =>
              orderActions.updateCustomerVoucherSuccess({ order })
            ),
            catchError((error) =>
              of(orderActions.updateCustomerVoucherFailure({ error }))
            )
          )
      )
    )
  );

  requestReturn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.requestReturn),
      mergeMap((action) =>
        this.orderService.requestReturn(action._id).pipe(
          map((order) => orderActions.requestReturnSuccess({ order })),
          catchError((error) =>
            of(orderActions.requestReturnFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
