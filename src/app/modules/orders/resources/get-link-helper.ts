export function getOrderLink(role: string, orderId: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-order', orderId];
    case 'manager':
      return ['/orders/manager-order', orderId];
    case 'support':
      return ['/orders/support-order', orderId];
    default:
      return ['/orders/order', orderId];
  }
}

export function getInvoiceLink(role: string, orderId: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-invoice', orderId];
    case 'manager':
      return ['/orders/manager-invoice', orderId];
    default:
      return ['/orders/invoice', orderId];
  }
}

export function getDeliveryNoteLink(role: string, orderId: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-delivery-note', orderId];
    case 'manager':
      return ['/orders/manager-delivery-note', orderId];
    case 'support':
      return ['/orders/support-delivery-note', orderId];
    default:
      return ['/orders/delivery-note', orderId];
  }
}

export function getDeviceProtectionLink(
  role: string,
  orderId: string
): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-device', orderId];
    case 'manager':
      return ['/orders/manager-device', orderId];
    case 'support':
      return ['/orders/support-device', orderId];
    default:
      return ['/orders/device', orderId];
  }
}

export function getReturnLink(role: string, orderId: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-return', orderId];
    case 'manager':
      return ['/orders/manager-return', orderId];
    case 'support':
      return ['/orders/support-return', orderId];
    default:
      return ['/orders/return', orderId];
  }
}

export function getOrderEditLink(role: string, orderId: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-order-edit', orderId];
    case 'manager':
      return ['/orders/manager-order-edit', orderId];
    case 'support':
      return ['/orders/support-order-edit', orderId];
    default:
      return [];
  }
}

export function getOrdersLink(role: string): string[] {
  switch (role) {
    case 'admin':
      return ['/orders/admin-orders'];
    case 'manager':
      return ['/orders/manager-orders'];
    case 'support':
      return ['/orders/support-orders'];
    default:
      return [];
  }
}
