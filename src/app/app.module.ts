import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from '@full-fledged/alerts';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { environment } from 'src/environments/environment';
import { reducers } from 'src/app/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OrdersModule } from 'src/app/modules/orders/orders.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersModule } from 'src/app/modules/users/users.module';

import { SpinnerEffects } from 'src/app/store/spinner.effects';
import { AlertEffects } from 'src/app/store/alert.effects';
import { RouteEffects } from 'src/app/store/route.effects';

import { AppComponent } from 'src/app/app.component';
import { CoreComponent } from 'src/app/core/core.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { TopBarComponent } from 'src/app/shared/top-bar/top-bar.component';

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean;
  }
}

@NgModule({
  declarations: [AppComponent, CoreComponent, HeaderComponent, TopBarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule.forRoot(),
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),
    RouterModule,
    SharedModule,
    OrdersModule,
    UsersModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AlertEffects, RouteEffects, SpinnerEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
