import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/modules/pages/home/home.component';
import { InfoEnglishComponent } from 'src/app/modules/pages/info/info-english/info-english.component';
import { InfoGermanComponent } from 'src/app/modules/pages/info/info-german/info-german.component';
import { InfoSpanishComponent } from 'src/app/modules/pages/info/info-spanish/info-spanish.component';
import { InfoRussianComponent } from 'src/app/modules/pages/info/info-russian/info-russian.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from 'src/app/modules/pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'info-english',
    component: InfoEnglishComponent,
  },
  { path: 'info-german', component: InfoGermanComponent },
  { path: 'info-spanish', component: InfoSpanishComponent },
  { path: 'info-russian', component: InfoRussianComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
