import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { Ticket } from 'src/app/modules/tickets/resources/customer-message';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getRequestHeaders(): any {
    const headers = this.authService.getHeaders();
    return headers ? { headers } : EMPTY;
  }

  // Admin
  getTickets(role: string): Observable<any> {
    return this.http.get<any>(`/api/tickets/${role}`, this.getRequestHeaders());
  }

  getTicket(_id: string, role: string): Observable<any> {
    return this.http.get<Ticket>(
      `/api/tickets/${_id}/${role}`,
      this.getRequestHeaders()
    );
  }

  updateTicket(
    _id: string,
    comment: string,
    time: number,
    status: string,
    modifiedBy: string
  ): Observable<any> {
    return this.http.put<Ticket>(
      `/api/tickets/${_id}/${modifiedBy}`,
      {
        comment,
        time,
        status,
        modifiedBy,
      },
      this.getRequestHeaders()
    );
  }

  removeTicket(ticketId: string) {
    return this.http.delete(
      `/api/tickets/${ticketId}/admin`,
      this.getRequestHeaders()
    );
  }

  openTicket(_id: string): Observable<any> {
    return this.http.put<Ticket>(`/api/tickets/${_id}/open`, {});
  }

  ticket(
    name: string,
    email: string,
    category: string,
    message: string
  ): Observable<Ticket> {
    return this.http.post<Ticket>('/api/tickets', {
      name,
      email,
      category,
      message,
    });
  }
}
