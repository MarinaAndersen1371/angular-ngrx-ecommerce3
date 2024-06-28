import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularCountriesFlagsModule } from 'angular-countries-flags';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PagesRoutingModule } from 'src/app/modules/pages/pages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { InfoEnglishComponent } from 'src/app/modules/pages/info/info-english/info-english.component';
import { InfoGermanComponent } from 'src/app/modules/pages/info/info-german/info-german.component';
import { InfoSpanishComponent } from 'src/app/modules/pages/info/info-spanish/info-spanish.component';
import { InfoRussianComponent } from 'src/app/modules/pages/info/info-russian/info-russian.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from 'src/app/modules/pages/not-found/not-found.component';
import { NoDataComponent } from 'src/app/modules/pages/no-data/no-data.component';

@NgModule({
  declarations: [
    HomeComponent,
    InfoEnglishComponent,
    InfoGermanComponent,
    InfoSpanishComponent,
    InfoRussianComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    AngularCountriesFlagsModule,
    PagesRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule,
  ],
  exports: [NotAuthorizedComponent, NoDataComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PagesModule {}
