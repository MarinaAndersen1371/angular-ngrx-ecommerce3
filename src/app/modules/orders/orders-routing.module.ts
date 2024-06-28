import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/modules/users/resources/auth.guard';
import { AdminGuard } from 'src/app/modules/users/resources/admin.guard';
import { ManagerGuard } from 'src/app/modules/users/resources/manager.guard';
import { SupportGuard } from 'src/app/modules/users/resources/support.guard';

//*********** Customer ***/
import { MyOrdersComponent } from 'src/app/modules/orders/customer/myorders/myorders.component';
import { OrderComponent } from 'src/app/modules/orders/customer/order/order.component';
import { DeliveryNoteComponent } from 'src/app/modules/orders/customer/delivery-note/delivery-note.component';
import { InvoiceComponent } from 'src/app/modules/orders/customer/invoice/invoice.component';
import { ReturnRequestComponent } from 'src/app/modules/orders/customer/return-request/return-request.component';
import { OrderReturnComponent } from 'src/app/modules/orders/customer/order-return/order-return.component';
import { OrderDeviceComponent } from 'src/app/modules/orders/customer/order-device/order-device.component';
//*********** Admin ***/
import { AdminOrdersComponent } from 'src/app/modules/orders/admin/admin-orders/admin-orders.component';
import { AdminOrderEditComponent } from 'src/app/modules/orders/admin/admin-order-edit/admin-order-edit.component';
import { AdminDeliveryComponent } from 'src/app/modules/orders/admin/admin-delivery/admin-delivery.component';
import { AdminOrderComponent } from 'src/app/modules/orders/admin/admin-order/admin-order.component';
import { AdminDeliveryNoteComponent } from 'src/app/modules/orders/admin/admin-delivery-note/admin-delivery-note.component';
import { AdminInvoiceComponent } from 'src/app/modules/orders/admin/admin-invoice/admin-invoice.component';
import { AdminReturnComponent } from 'src/app/modules/orders/admin/admin-return/admin-return.component';
import { AdminReturnsComponent } from 'src/app/modules/orders/admin/admin-returns/admin-returns.component';
import { AdminDeviceComponent } from 'src/app/modules/orders/admin/admin-device/admin-device.component';
import { AdminVouchersComponent } from 'src/app/modules/orders/admin/admin-vouchers/admin-vouchers.component';
import { AdminDevicesComponent } from 'src/app/modules/orders/admin/admin-devices/admin-devices.component';
import { AdminPackagesComponent } from 'src/app/modules/orders/admin/admin-packages/admin-packages.component';
import { AdminOverviewComponent } from 'src/app/modules/orders/admin/admin-overview/admin-overview.component';
import { AdminInvoicesComponent } from 'src/app/modules/orders/admin/admin-invoices/admin-invoices.component';
//*********** Manager ***/
import { ManagerOrderComponent } from 'src/app/modules/orders/manager/manager-order/manager-order.component';
import { ManagerOrdersComponent } from 'src/app/modules/orders/manager/manager-orders/manager-orders.component';
import { ManagerDeliveryComponent } from 'src/app/modules/orders/manager/manager-delivery/manager-delivery.component';
import { ManagerOrderEditComponent } from 'src/app/modules/orders/manager/manager-order-edit/manager-order-edit.component';
import { ManagerDeliveryNoteComponent } from 'src/app/modules/orders/manager/manager-delivery-note/manager-delivery-note.component';
import { ManagerInvoiceComponent } from 'src/app/modules/orders/manager/manager-invoice/manager-invoice.component';
import { ManagerReturnComponent } from 'src/app/modules/orders/manager/manager-return/manager-return.component';
import { ManagerReturnsComponent } from 'src/app/modules/orders/manager/manager-returns/manager-returns.component';
import { ManagerDeviceComponent } from 'src/app/modules/orders/manager/manager-device/manager-device.component';
import { ManagerDevicesComponent } from 'src/app/modules/orders/manager/manager-devices/manager-devices.component';
import { ManagerVouchersComponent } from 'src/app/modules/orders/manager/manager-vouchers/manager-vouchers.component';
import { ManagerPackagesComponent } from 'src/app/modules/orders/manager/manager-packages/manager-packages.component';
import { ManagerOverviewComponent } from 'src/app/modules/orders/manager/manager-overview/manager-overview.component';
import { ManagerInvoicesComponent } from 'src/app/modules/orders/manager/manager-invoices/manager-invoices.component';
//*********** Support ***/
import { SupportDeviceComponent } from 'src/app/modules/orders/support/support-device/support-device.component';
import { SupportDevicesComponent } from 'src/app/modules/orders/support/support-devices/support-devices.component';
import { SupportOrderComponent } from 'src/app/modules/orders/support/support-order/support-order.component';
import { SupportOrderEditComponent } from 'src/app/modules/orders/support/support-order-edit/support-order-edit.component';
import { SupportOrdersComponent } from 'src/app/modules/orders/support/support-orders/support-orders.component';
import { SupportDeliveryComponent } from 'src/app/modules/orders/support/support-delivery/support-delivery.component';
import { SupportDeliveryNoteComponent } from 'src/app/modules/orders/support/support-delivery-note/support-delivery-note.component';
import { SupportReturnsComponent } from 'src/app/modules/orders/support/support-returns/support-returns.component';
import { SupportReturnComponent } from 'src/app/modules/orders/support/support-return/support-return.component';

const routes: Routes = [
  //*********** User ***/
  { path: 'myorders', canActivate: [AuthGuard], component: MyOrdersComponent },
  { path: 'order/:id', canActivate: [AuthGuard], component: OrderComponent },
  {
    path: 'invoice/:id',
    canActivate: [AuthGuard],
    component: InvoiceComponent,
  },
  {
    path: 'delivery-note/:id',
    canActivate: [AuthGuard],
    component: DeliveryNoteComponent,
  },
  {
    path: 'return-request/:id',
    canActivate: [AuthGuard],
    component: ReturnRequestComponent,
  },
  {
    path: 'return/:id',
    canActivate: [AuthGuard],
    component: OrderReturnComponent,
  },
  {
    path: 'device/:id',
    canActivate: [AuthGuard],
    component: OrderDeviceComponent,
  },
  //*********** Admin ***/
  {
    path: 'admin-order/:id',
    canActivate: [AdminGuard],
    component: AdminOrderComponent,
  },
  {
    path: 'admin-invoice/:id',
    canActivate: [AdminGuard],
    component: AdminInvoiceComponent,
  },
  {
    path: 'admin-delivery-note/:id',
    canActivate: [AdminGuard],
    component: AdminDeliveryNoteComponent,
  },
  {
    path: 'admin-return/:id',
    canActivate: [AdminGuard],
    component: AdminReturnComponent,
  },
  {
    path: 'admin-device/:id',
    canActivate: [AdminGuard],
    component: AdminDeviceComponent,
  },
  {
    path: 'admin-orders',
    canActivate: [AdminGuard],
    component: AdminOrdersComponent,
  },
  {
    path: 'admin-delivery',
    canActivate: [AdminGuard],
    component: AdminDeliveryComponent,
  },
  {
    path: 'admin-returns',
    canActivate: [AdminGuard],
    component: AdminReturnsComponent,
  },
  {
    path: 'admin-devices',
    canActivate: [AdminGuard],
    component: AdminDevicesComponent,
  },
  {
    path: 'admin-invoices',
    canActivate: [AdminGuard],
    component: AdminInvoicesComponent,
  },
  {
    path: 'admin-vouchers',
    canActivate: [AdminGuard],
    component: AdminVouchersComponent,
  },
  {
    path: 'admin-packages',
    canActivate: [AdminGuard],
    component: AdminPackagesComponent,
  },
  {
    path: 'admin-overview',
    canActivate: [AdminGuard],
    component: AdminOverviewComponent,
  },
  {
    path: 'admin-order-edit/:id',
    canActivate: [AdminGuard],
    component: AdminOrderEditComponent,
  },
  //*********** Manager ***/
  {
    path: 'manager-order/:id',
    canActivate: [ManagerGuard],
    component: ManagerOrderComponent,
  },
  {
    path: 'manager-invoice/:id',
    canActivate: [ManagerGuard],
    component: ManagerInvoiceComponent,
  },
  {
    path: 'manager-delivery-note/:id',
    canActivate: [ManagerGuard],
    component: ManagerDeliveryNoteComponent,
  },
  {
    path: 'manager-return/:id',
    canActivate: [ManagerGuard],
    component: ManagerReturnComponent,
  },
  {
    path: 'manager-device/:id',
    canActivate: [ManagerGuard],
    component: ManagerDeviceComponent,
  },
  {
    path: 'manager-order-edit/:id',
    canActivate: [ManagerGuard],
    component: ManagerOrderEditComponent,
  },
  {
    path: 'manager-orders',
    canActivate: [ManagerGuard],
    component: ManagerOrdersComponent,
  },
  {
    path: 'manager-invoices',
    canActivate: [ManagerGuard],
    component: ManagerInvoicesComponent,
  },
  {
    path: 'manager-returns',
    canActivate: [ManagerGuard],
    component: ManagerReturnsComponent,
  },
  {
    path: 'manager-devices',
    canActivate: [ManagerGuard],
    component: ManagerDevicesComponent,
  },
  {
    path: 'manager-delivery',
    canActivate: [ManagerGuard],
    component: ManagerDeliveryComponent,
  },
  {
    path: 'manager-vouchers',
    canActivate: [ManagerGuard],
    component: ManagerVouchersComponent,
  },
  {
    path: 'manager-packages',
    canActivate: [ManagerGuard],
    component: ManagerPackagesComponent,
  },
  {
    path: 'manager-overview',
    canActivate: [ManagerGuard],
    component: ManagerOverviewComponent,
  },
  //*********** Support ***/
  {
    path: 'support-order/:id',
    canActivate: [SupportGuard],
    component: SupportOrderComponent,
  },
  {
    path: 'support-device/:id',
    canActivate: [SupportGuard],
    component: SupportDeviceComponent,
  },
  {
    path: 'support-delivery-note/:id',
    canActivate: [SupportGuard],
    component: SupportDeliveryNoteComponent,
  },
  {
    path: 'support-return/:id',
    canActivate: [SupportGuard],
    component: SupportReturnComponent,
  },
  {
    path: 'support-orders',
    canActivate: [SupportGuard],
    component: SupportOrdersComponent,
  },
  {
    path: 'support-order-edit/:id',
    canActivate: [SupportGuard],
    component: SupportOrderEditComponent,
  },
  {
    path: 'support-devices',
    canActivate: [SupportGuard],
    component: SupportDevicesComponent,
  },
  {
    path: 'support-delivery',
    canActivate: [SupportGuard],
    component: SupportDeliveryComponent,
  },
  {
    path: 'support-returns',
    canActivate: [SupportGuard],
    component: SupportReturnsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
