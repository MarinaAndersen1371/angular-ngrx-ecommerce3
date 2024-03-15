import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/users/resources/user';

export const loadAdminUsers = createAction(
  '[Admin Users Component] Load Admin Users',
  props<{ role: string }>()
);
export const loadManagerUsers = createAction(
  '[Manager Users Component] Load Manager Users',
  props<{ role: string }>()
);
export const loadUsersSuccess = createAction(
  '[User Effect] Load Users Success',
  props<{ users: User[]; statistics: any }>()
);
export const loadUsersFailure = createAction(
  '[User Effect] Load Users Failure',
  props<{ error: any }>()
);
//**********************/
export const deleteUser = createAction(
  '[User List Component] Delete User',
  props<{ userId: string }>()
);
export const deleteUserSuccess = createAction(
  '[User Effect] Delete User Success',
  props<{ user: User }>()
);
export const deleteUserFailure = createAction(
  '[User Effect] Delete User Failure',
  props<{ error: any }>()
);
//***************************/
export const loadUser = createAction(
  '[User Profile Component] Load User',
  props<{ _id: string; role: string }>()
);
export const loadAdminUser = createAction(
  '[Admin User Component] Load Admin User',
  props<{ _id: string; role: string }>()
);
export const loadManagerUser = createAction(
  '[Manager User Component] Load Manager User',
  props<{ _id: string; role: string }>()
);
export const loadUserSuccess = createAction(
  '[User Effect] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User Effect] Load User Failure',
  props<{ error: any }>()
);
//***************************/
export const updateAdminUser = createAction(
  '[Admin User Edit Component] Update Admin User',
  props<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    purpose: string;
    birthday: string;
    gender: string;
    coupon: string;
    testScore: any;
    isManager: boolean;
    isSupport: boolean;
  }>()
);
export const updateUserSuccess = createAction(
  '[User Effect] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User Effect] Update User Failure',
  props<{ error: any }>()
);
//***************************/
export const addToCart = createAction(
  '[Product View Component] addToCart',
  props<{
    _id: string;
    item: any;
    qty: number;
    warranty: string;
    gift: string;
    extra1: string;
    extra2: string;
  }>()
);
export const addToCartSuccess = createAction(
  '[User Effect] addToCart Success',
  props<{ user: User }>()
);
export const addToCartFailure = createAction(
  '[User Effect] addToCart Failure',
  props<{ error: any }>()
);
//**************************/
export const removeFromCart = createAction(
  '[User Cart Component] removeFromCart',
  props<{
    _id: string;
    item: any;
  }>()
);
export const removeFromCartSuccess = createAction(
  '[User Effect] removeFromCart Success',
  props<{ user: User }>()
);
export const removeFromCartFailure = createAction(
  '[User Effect] removeFromCart Failure',
  props<{ error: any }>()
);
//***************************/
export const updateProfile = createAction(
  '[Profile Edit Component] Update Profile',
  props<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    purpose: string;
    birthday: string;
    gender: string;
  }>()
);
export const updateProfileSuccess = createAction(
  '[User Effect] Update Profile Success',
  props<{ user: User }>()
);
export const updateProfileFailure = createAction(
  '[User Effect] Update Profile Failure',
  props<{ error: any }>()
);
/***************************/
export const updateUserTest = createAction(
  '[User Test Component] Update User Test',
  props<{
    _id: string;
    test1: string;
    test2: string;
    test3: string;
    test4: string;
    test5: string;
  }>()
);
export const updateUserTestSuccess = createAction(
  '[User Effect] Update User Test Success',
  props<{ user: User }>()
);
export const updateUserTestFailure = createAction(
  '[User Effect] Update User Test Failure',
  props<{ error: any }>()
);
/***************************/
export const updateTestScore = createAction(
  '[Manager User Edit Component] Update Test Score',
  props<{
    _id: string;
    testScore: any;
  }>()
);
export const updateTestScoreSuccess = createAction(
  '[User Effect] Update Test Score Success',
  props<{ user: User }>()
);
export const updateTestScoreFailure = createAction(
  '[User Effect] Update Test Score Failure',
  props<{ error: any }>()
);
/***************************/
export const updateUserCoupon = createAction(
  '[Manager User Edit Component] Update User Coupon',
  props<{
    _id: string;
    coupon: string;
  }>()
);
export const updateUserCouponSuccess = createAction(
  '[User Effect] Update User Coupon Success',
  props<{ user: User }>()
);
export const updateUserCouponFailure = createAction(
  '[User Effect] Update User Coupon Failure',
  props<{ error: any }>()
);
/***************************/
export const resetPassword = createAction(
  '[Manager User Edit Component] Reset User Password',
  props<{
    _id: string;
  }>()
);
export const resetPasswordSuccess = createAction(
  '[User Effect] Reset User Password Success',
  props<{ user: User }>()
);
export const resetPasswordFailure = createAction(
  '[User Effect] Reset User Password Failure',
  props<{ error: any }>()
);
