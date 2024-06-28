import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { Order } from 'src/app/modules/orders/resources/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getRequestHeaders(): any {
    const headers = this.authService.getHeaders();
    return headers ? { headers } : EMPTY;
  }

  getMyOrders(): Observable<any> {
    return this.http.get<any>('/api/orders/myorders', this.getRequestHeaders());
  }

  getOrders(role: string): Observable<any> {
    return this.http.get<any>(`/api/orders/${role}`, this.getRequestHeaders());
  }

  getOrder(_id: string, role: string): Observable<any> {
    return this.http.get<Order>(
      `/api/orders/${_id}/${role}`,
      this.getRequestHeaders()
    );
  }

  getMyOrder(_id: string): Observable<any> {
    return this.http.get<Order>(`/api/orders/${_id}`, this.getRequestHeaders());
  }

  createOrder(
    _id: string,
    name: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
    delivery: any,
    nameInvoice: string,
    addressInvoice: string,
    cityInvoice: string,
    postalCodeInvoice: string,
    countryInvoice: string,
    method: string,
    account: string,
    prime: string,
    franchise: string
  ): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post<Order>(
      '/api/orders',
      {
        _id,
        name,
        address,
        city,
        postalCode,
        country,
        delivery,
        nameInvoice,
        addressInvoice,
        cityInvoice,
        postalCodeInvoice,
        countryInvoice,
        method,
        account,
        prime,
        franchise,
      },
      this.getRequestHeaders()
    );
  }

  updateOrderToPaid(_id: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/paid`,
      {},
      this.getRequestHeaders()
    );
  }

  updateCustomerVoucher(
    _id: string,
    userId: string,
    voucher: string
  ): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/voucher`,
      {
        userId,
        voucher,
      },
      this.getRequestHeaders()
    );
  }

  requestReturn(_id: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/requestreturn`,
      {},
      this.getRequestHeaders()
    );
  }

  updateOrderToSent(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/sent/${role}`,
      { role },
      this.getRequestHeaders()
    );
  }

  updateOrderToDelivered(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/deliver/${role}`,
      { role },
      this.getRequestHeaders()
    );
  }

  updateInvoiceToSent(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/invoice/${role}`,
      { role },
      this.getRequestHeaders()
    );
  }

  updateReturnToReceived(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/returnreceived/${role}`,
      { role },
      this.getRequestHeaders()
    );
  }

  updateRefundToPaid(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/refund/${role}`,
      { role },
      this.getRequestHeaders()
    );
  }

  updateReturnToClosed(_id: string, role: string): Observable<any> {
    return this.http.put<Order>(
      `/api/orders/${_id}/returnclosed/${role}`,
      {},
      this.getRequestHeaders()
    );
  }
}
