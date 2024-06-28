import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { TicketsRoutingModule } from 'src/app/modules/tickets/tickets-routing.module';
import { PagesModule } from 'src/app/modules/pages/pages.module';
import { TicketEffects } from 'src/app/modules/tickets/state/ticket.effects';
import { CustomerSupportComponent } from 'src/app/modules/tickets/customer-support/customer-support.component';
import { AdminTicketsComponent } from 'src/app/modules/tickets/admin-tickets/admin-tickets.component';
import { AdminTicketComponent } from 'src/app/modules/tickets/admin-ticket/admin-ticket.component';
import { ManagerTicketsComponent } from 'src/app/modules/tickets/manager-tickets/manager-tickets.component';
import { ManagerTicketComponent } from 'src/app/modules/tickets/manager-ticket/manager-ticket.component';
import { SupportTicketComponent } from 'src/app/modules/tickets/support-ticket/support-ticket.component';
import { SupportTicketsComponent } from 'src/app/modules/tickets/support-tickets/support-tickets.component';

@NgModule({
  declarations: [
    CustomerSupportComponent,
    AdminTicketsComponent,
    AdminTicketComponent,
    ManagerTicketsComponent,
    ManagerTicketComponent,
    SupportTicketComponent,
    SupportTicketsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    PagesModule,
    TicketsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    EffectsModule.forFeature([TicketEffects]),
  ],
})
export class TicketsModule {}
