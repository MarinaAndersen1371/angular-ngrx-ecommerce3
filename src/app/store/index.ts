import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromProduct from 'src/app/modules/products/state/product.reducers';
import * as fromAuth from 'src/app/modules/users/state/auth.reducer';
import * as fromMail from 'src/app/modules/mails/state/mail.reducers';
import * as fromOrder from 'src/app/modules/orders/state/order.reducers';
import * as fromTicket from 'src/app/modules/tickets/state/ticket.reducers';
import * as fromUser from 'src/app/modules/users/state/user.reducers';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromMail.mailsFeatureKey]: fromMail.State;
  [fromOrder.ordersFeatureKey]: fromOrder.State;
  [fromProduct.productsFeatureKey]: fromProduct.State;
  [fromTicket.ticketsFeatureKey]: fromTicket.State;
  [fromUser.usersFeatureKey]: fromUser.State;

  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromMail.mailsFeatureKey]: fromMail.reducer,
  [fromOrder.ordersFeatureKey]: fromOrder.reducer,
  [fromProduct.productsFeatureKey]: fromProduct.reducer,
  [fromTicket.ticketsFeatureKey]: fromTicket.reducer,
  [fromUser.usersFeatureKey]: fromUser.reducer,

  router: fromRouter.routerReducer,
};
