import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/users/state/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthLinksViewModal {
  isLoggedIn: boolean;
  _id: any;
  firstName: string;
  email: string;
  isAdmin: boolean;
  isManager: boolean;
  isSupport: boolean;
  isPrime: boolean;
  isFranchise: boolean;
  coupon: string;
}

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

export const selectAuthLinksViewModel = createSelector(
  selectUser,
  (user): AuthLinksViewModal => {
    if (!user) {
      return {
        isLoggedIn: false,
        _id: null,
        firstName: '',
        email: '',
        isAdmin: false,
        isManager: false,
        isSupport: false,
        isPrime: false,
        isFranchise: false,
        coupon: '',
      };
    }

    return {
      isLoggedIn: true,
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      isSupport: user.isSupport,
      isPrime: user.isPrime,
      isFranchise: user.isFranchise,
      coupon: user.coupon,
    };
  }
);
