import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MailsRoutingModule } from 'src/app/modules/mails/mails-routing.module';
import { PagesModule } from 'src/app/modules/pages/pages.module';
import * as fromMails from 'src/app/modules/mails/state/mail.reducers';
import { MailEffects } from 'src/app/modules/mails/state/mail.effects';
import { MailComponent } from 'src/app/modules/mails/mail/mail.component';
import { MyMailsComponent } from 'src/app/modules/mails/my-mails/my-mails.component';
import { SentMailComponent } from 'src/app/modules/mails/sent-mail/sent-mail.component';
import { SentMailsComponent } from 'src/app/modules/mails/sent-mails/sent-mails.component';

@NgModule({
  declarations: [
    MyMailsComponent,
    MailComponent,
    SentMailsComponent,
    SentMailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    MailsRoutingModule,
    PagesModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    StoreModule.forFeature(fromMails.mailsFeatureKey, fromMails.reducer),
    EffectsModule.forFeature([MailEffects]),
  ],
})
export class MailsModule {}
