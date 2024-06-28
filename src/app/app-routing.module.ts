import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from 'src/app/core/core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/modules/pages/pages.module').then(
            (m) => m.PagesModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/modules/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./modules/tickets/tickets.module').then(
            (m) => m.TicketsModule
          ),
      },
      {
        path: 'mails',
        loadChildren: () =>
          import('./modules/mails/mails.module').then((m) => m.MailsModule),
      },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
