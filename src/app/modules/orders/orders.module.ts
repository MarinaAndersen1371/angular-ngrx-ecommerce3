import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { OrdersRoutingModule } from 'src/app/modules/orders/orders-routing.module';
import * as fromOrder from 'src/app/modules/orders/state/order.reducers';
import { OrderEffects } from 'src/app/modules/orders/state/order.effects';
import { OrderAdminEffects } from 'src/app/modules/orders/state/orderAdmin.effects';
import { PagesModule } from 'src/app/modules/pages/pages.module';

//*********** Customer ***/
import { DeliveryNoteComponent } from 'src/app/modules/orders/customer/delivery-note/delivery-note.component';
import { InvoiceComponent } from 'src/app/modules/orders/customer/invoice/invoice.component';
import { MyOrdersComponent } from 'src/app/modules/orders/customer/myorders/myorders.component';
import { OrderComponent } from 'src/app/modules/orders/customer/order/order.component';
import { OrderReturnComponent } from 'src/app/modules/orders/customer/order-return/order-return.component';
import { OrderDeviceComponent } from 'src/app/modules/orders/customer/order-device/order-device.component';
import { ReturnRequestComponent } from 'src/app/modules/orders/customer/return-request/return-request.component';
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
import { SupportOrdersComponent } from 'src/app/modules/orders/support/support-orders/support-orders.component';
import { SupportOrderEditComponent } from './support/support-order-edit/support-order-edit.component';
import { SupportDeliveryComponent } from 'src/app/modules/orders/support/support-delivery/support-delivery.component';
import { SupportDeliveryNoteComponent } from 'src/app/modules/orders/support/support-delivery-note/support-delivery-note.component';
import { SupportReturnsComponent } from 'src/app/modules/orders/support/support-returns/support-returns.component';
import { SupportReturnComponent } from 'src/app/modules/orders/support/support-return/support-return.component';
//*********** Helpers ***/
import { DeliveryNoteTableComponent } from './helpers/delivery-note-table/delivery-note-table.component';
import { DeliveryListComponent } from './helpers/delivery-list/delivery-list.component';
import { DeliveryListStatisticsComponent } from './helpers/delivery-list-statistics/delivery-list-statistics.component';
import { InvoiceAddressComponent } from 'src/app/modules/orders/helpers/invoice-address/invoice-address.component';
import { OrderSummaryComponent } from './helpers/order-summary/order-summary.component';
import { OrderTableComponent } from 'src/app/modules/orders/helpers/order-table/order-table.component';
import { PaymentComponent } from 'src/app/modules/orders/helpers/payment/payment.component';
import { OrderListTableComponent } from './helpers/order-list-table/order-list-table.component';
import { OrderListStatisticsComponent } from './helpers/order-list-statistics/order-list-statistics.component';
import { ReturnTableComponent } from './helpers/return-table/return-table.component';
import { ShippingAddressComponent } from 'src/app/modules/orders/helpers/shipping-address/shipping-address.component';
import { VoucherFormComponent } from 'src/app/modules/orders/helpers/voucher-form/voucher-form.component';
import { OrderLinksComponent } from './helpers/order-links/order-links.component';
import { DevicesListTableComponent } from './helpers/devices-list-table/devices-list-table.component';
import { DeviceTableComponent } from './helpers/device-table/device-table.component';
import { OrderEditComponent } from './helpers/order-edit/order-edit.component';
import { ReturnListTableComponent } from './helpers/return-list-table/return-list-table.component';

@NgModule({
  declarations: [
    DeliveryNoteComponent,
    InvoiceComponent,
    MyOrdersComponent,
    OrderComponent,
    OrderDeviceComponent,
    OrderReturnComponent,
    ReturnRequestComponent,
    AdminOrderComponent,
    AdminOrdersComponent,
    AdminOrderEditComponent,
    AdminDeliveryComponent,
    AdminDeliveryNoteComponent,
    AdminVouchersComponent,
    AdminInvoiceComponent,
    AdminReturnComponent,
    AdminReturnsComponent,
    AdminDeviceComponent,
    AdminDevicesComponent,
    AdminPackagesComponent,
    AdminInvoicesComponent,
    AdminOverviewComponent,
    ManagerOrdersComponent,
    ManagerDeliveryComponent,
    ManagerOrderEditComponent,
    ManagerOrderComponent,
    ManagerDeliveryNoteComponent,
    ManagerInvoiceComponent,
    ManagerReturnComponent,
    ManagerReturnsComponent,
    ManagerDeviceComponent,
    ManagerDevicesComponent,
    ManagerVouchersComponent,
    ManagerPackagesComponent,
    ManagerInvoicesComponent,
    ManagerOverviewComponent,
    SupportDeviceComponent,
    SupportDevicesComponent,
    SupportOrderComponent,
    SupportOrdersComponent,
    SupportOrderEditComponent,
    SupportDeliveryComponent,
    SupportDeliveryNoteComponent,
    SupportReturnsComponent,
    SupportReturnComponent,
    InvoiceAddressComponent,
    DeliveryNoteTableComponent,
    DeliveryListComponent,
    DeliveryListStatisticsComponent,
    OrderTableComponent,
    PaymentComponent,
    OrderSummaryComponent,
    OrderListTableComponent,
    OrderListStatisticsComponent,
    ReturnTableComponent,
    ShippingAddressComponent,
    VoucherFormComponent,
    OrderLinksComponent,
    DevicesListTableComponent,
    DeviceTableComponent,
    OrderEditComponent,
    ReturnListTableComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    OrdersRoutingModule,
    FormsModule,
    FontAwesomeModule,
    PagesModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects, OrderAdminEffects]),
  ],
})
export class OrdersModule {}
