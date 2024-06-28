import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsersRoutingModule } from 'src/app/modules/users/users-routing.module';
import { PagesModule } from 'src/app/modules/pages/pages.module';
import { AuthEffects } from 'src/app/modules/users/state/auth.effects';
import { UserEffects } from 'src/app/modules/users/state/user.effects';
import { UserAdminEffects } from 'src/app/modules/users/state/userAdmin.effects';
import { UserManagerEffects } from 'src/app/modules/users/state/userManager.effects';
import * as fromAuth from 'src/app/modules/users/state/auth.reducer';

import { AuthLinksComponent } from 'src/app/modules/users/auth/auth-links/auth-links.component';
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

@NgModule({
  declarations: [
    AuthLinksComponent,
    LoginComponent,
    RegisterComponent,
    CartCheckoutComponent,
    CartDetailsComponent,
    CartSubscriptionComponent,
    UserCartComponent,
    UserProfileComponent,
    ProfileEditComponent,
    UserTestComponent,
    AdminUserComponent,
    AdminUsersComponent,
    AdminUserEditComponent,
    AdminFranchiselistComponent,
    AdminPrimelistComponent,
    ManagerUsersComponent,
    ManagerUserComponent,
    ManagerUserEditComponent,
    ManagerFranchiselistComponent,
    ManagerPrimelistComponent,
    FranchiseInfoComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PagesModule,
    UsersRoutingModule,
    BsDropdownModule.forRoot(),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([
      AuthEffects,
      UserEffects,
      UserAdminEffects,
      UserManagerEffects,
    ]),
  ],
  exports: [AuthLinksComponent],
})
export class UsersModule {}
