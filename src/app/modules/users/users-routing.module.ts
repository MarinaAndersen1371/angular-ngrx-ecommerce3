import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/users/resources/auth.guard';
import { AdminGuard } from 'src/app/modules/users/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/users/resources/manager.guard';
import { FranchiseGuard } from 'src/app/modules/users/resources/franchise.guard';

import { LoginComponent } from 'src/app/modules/users/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/users/auth/register/register.component';
import { CartCheckoutComponent } from 'src/app/modules/users/user/cart-checkout/cart-checkout.component';
import { CartDetailsComponent } from 'src/app/modules/users/user/cart-details/cart-details.component';
import { CartSubscriptionComponent } from 'src/app/modules/users/user/cart-subscription/cart-subscription.component';
import { UserCartComponent } from 'src/app/modules/users/user/user-cart/user-cart.component';
import { UserProfileComponent } from 'src/app/modules/users/user/user-profile/user-profile.component';
import { ProfileEditComponent } from 'src/app/modules/users/user/profile-edit/profile-edit.component';
import { UserTestComponent } from 'src/app/modules/users/user/user-test/user-test.component';

import { AdminUserComponent } from 'src/app/modules/users/site/admin-user/admin-user.component';
import { AdminUsersComponent } from 'src/app/modules/users/site/admin-users/admin-users.component';
import { AdminUserEditComponent } from 'src/app/modules/users/site/admin-user-edit/admin-user-edit.component';
import { AdminFranchiselistComponent } from 'src/app/modules/users/site/admin-franchiselist/admin-franchiselist.component';
import { AdminPrimelistComponent } from 'src/app/modules/users/site/admin-primelist/admin-primelist.component';

import { ManagerUsersComponent } from 'src/app/modules/users/site/manager-users/manager-users.component';
import { ManagerUserComponent } from 'src/app/modules/users/site/manager-user/manager-user.component';
import { ManagerUserEditComponent } from 'src/app/modules/users/site/manager-user-edit/manager-user-edit.component';
import { ManagerFranchiselistComponent } from 'src/app/modules/users/site/manager-franchiselist/manager-franchiselist.component';
import { ManagerPrimelistComponent } from 'src/app/modules/users/site/manager-primelist/manager-primelist.component';

import { FranchiseInfoComponent } from 'src/app/modules/users/site/franchise-info/franchise-info.component';

const routes: Routes = [
  //*********** User area ***/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user-cart/:id',
    canActivate: [AuthGuard],
    component: UserCartComponent,
  },
  {
    path: 'cart-details/:id',
    canActivate: [AuthGuard],
    component: CartDetailsComponent,
  },
  {
    path: 'cart-subscription/:id',
    canActivate: [AuthGuard],
    component: CartSubscriptionComponent,
  },
  {
    path: 'cart-checkout/:id',
    canActivate: [AuthGuard],
    component: CartCheckoutComponent,
  },
  {
    path: 'user-profile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  {
    path: 'profile-edit/:id',
    canActivate: [AuthGuard],
    component: ProfileEditComponent,
  },
  {
    path: 'user-test/:id',
    canActivate: [AuthGuard],
    component: UserTestComponent,
  },
  //*********** Admin area ***/
  {
    path: 'admin-users',
    canActivate: [AdminGuard],
    component: AdminUsersComponent,
  },
  {
    path: 'admin-primelist',
    canActivate: [AdminGuard],
    component: AdminPrimelistComponent,
  },
  {
    path: 'admin-franchiselist',
    canActivate: [AdminGuard],
    component: AdminFranchiselistComponent,
  },
  {
    path: 'admin-user/:id',
    canActivate: [AdminGuard],
    component: AdminUserComponent,
  },
  {
    path: 'admin-user-edit/:id',
    canActivate: [AdminGuard],
    component: AdminUserEditComponent,
  },
  //*********** Manager area ***/
  {
    path: 'manager-users',
    canActivate: [ManagerGuard],
    component: ManagerUsersComponent,
  },
  {
    path: 'manager-primelist',
    canActivate: [ManagerGuard],
    component: ManagerPrimelistComponent,
  },
  {
    path: 'manager-franchiselist',
    canActivate: [ManagerGuard],
    component: ManagerFranchiselistComponent,
  },
  {
    path: 'manager-user/:id',
    canActivate: [ManagerGuard],
    component: ManagerUserComponent,
  },
  {
    path: 'manager-user-edit/:id',
    canActivate: [ManagerGuard],
    component: ManagerUserEditComponent,
  },
  //*********** Franchise area ***/
  {
    path: 'franchise/info',
    canActivate: [FranchiseGuard],
    component: FranchiseInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
