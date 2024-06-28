import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from 'src/app/modules/users/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/users/resources/manager.guard';
import { SupportGuard } from 'src/app/modules/users/resources/support.guard';

import { CustomerSupportComponent } from 'src/app/modules/tickets/customer-support/customer-support.component';
import { AdminTicketsComponent } from 'src/app/modules/tickets/admin-tickets/admin-tickets.component';
import { AdminTicketComponent } from 'src/app/modules/tickets/admin-ticket/admin-ticket.component';
import { ManagerTicketsComponent } from 'src/app/modules/tickets/manager-tickets/manager-tickets.component';
import { ManagerTicketComponent } from 'src/app/modules/tickets/manager-ticket/manager-ticket.component';
import { SupportTicketComponent } from 'src/app/modules/tickets/support-ticket/support-ticket.component';
import { SupportTicketsComponent } from 'src/app/modules/tickets/support-tickets/support-tickets.component';

const routes: Routes = [
  { path: 'customer-support', component: CustomerSupportComponent },
  {
    path: 'admin-tickets',
    canActivate: [AdminGuard],
    component: AdminTicketsComponent,
  },
  {
    path: 'admin-ticket/:id',
    canActivate: [AdminGuard],
    component: AdminTicketComponent,
  },
  {
    path: 'manager-tickets',
    canActivate: [ManagerGuard],
    component: ManagerTicketsComponent,
  },
  {
    path: 'manager/ticket/:id',
    canActivate: [ManagerGuard],
    component: ManagerTicketComponent,
  },
  {
    path: 'support-tickets',
    canActivate: [SupportGuard],
    component: SupportTicketsComponent,
  },
  {
    path: 'support/ticket/:id',
    canActivate: [SupportGuard],
    component: SupportTicketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
