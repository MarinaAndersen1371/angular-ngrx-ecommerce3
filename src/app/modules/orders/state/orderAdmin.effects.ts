import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { OrderService } from 'src/app/modules/orders/resources/order.service';
import * as orderActions from 'src/app/modules/orders/state/order.actions';

@Injectable()
export class OrderAdminEffects {
  updateOrderToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminOrderToSent,
        orderActions.updateManagerOrderToSent
      ),
      mergeMap((action) =>
        this.orderService.updateOrderToSent(action._id, action.role).pipe(
          map((order) => orderActions.updateOrderToSentSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToSentFailure({ error }))
          )
        )
      )
    )
  );

  updateOrderToDelivered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminOrderToDelivered,
        orderActions.updateManagerOrderToDelivered
      ),
      mergeMap((action) =>
        this.orderService.updateOrderToDelivered(action._id, action.role).pipe(
          map((order) => orderActions.updateOrderToDeliveredSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateOrderToDeliveredFailure({ error }))
          )
        )
      )
    )
  );

  updateInvoiceToSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminInvoiceToSent,
        orderActions.updateManagerInvoiceToSent
      ),
      mergeMap((action) =>
        this.orderService.updateInvoiceToSent(action._id, action.role).pipe(
          map((order) => orderActions.updateInvoiceToSentSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateInvoiceToSentFailure({ error }))
          )
        )
      )
    )
  );

  updateReturnToReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminReturnToReceived,
        orderActions.updateManagerReturnToReceived
      ),
      mergeMap((action) =>
        this.orderService.updateReturnToReceived(action._id, action.role).pipe(
          map((order) => orderActions.updateReturnToReceivedSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateReturnToReceivedFailure({ error }))
          )
        )
      )
    )
  );

  updateRefundToPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminRefundToPaid,
        orderActions.updateManagerRefundToPaid
      ),
      mergeMap((action) =>
        this.orderService.updateRefundToPaid(action._id, action.role).pipe(
          map((order) => orderActions.updateRefundToPaidSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateRefundToPaidFailure({ error }))
          )
        )
      )
    )
  );
  updateReturnToClosed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        orderActions.updateAdminReturnToClosed,
        orderActions.updateManagerReturnToClosed
      ),
      mergeMap((action) =>
        this.orderService.updateReturnToClosed(action._id, action.role).pipe(
          map((order) => orderActions.updateReturnToClosedSuccess({ order })),
          catchError((error) =>
            of(orderActions.updateReturnToClosedFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService) {}
}
