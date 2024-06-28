import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { Mail } from 'src/app/modules/mails/resources/mail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getRequestHeaders(): any {
    const headers = this.authService.getHeaders();
    return headers ? { headers } : EMPTY;
  }

  getMails(): Observable<any> {
    return this.http.get<any>('/api/mails', this.getRequestHeaders());
  }

  getMail(_id: string): Observable<any> {
    return this.http.get<Mail>(`/api/mails/${_id}`, this.getRequestHeaders());
  }

  statusMail(mailId: string): Observable<any> {
    return this.http.put<Mail>(
      `/api/mails/${mailId}`,
      {},
      this.getRequestHeaders()
    );
  }

  openMail(mailId: string): Observable<any> {
    return this.http.put<Mail>(
      `/api/mails/${mailId}/open`,
      {},
      this.getRequestHeaders()
    );
  }

  deleteIn(mailId: string): Observable<any> {
    return this.http.put<Mail>(
      `/api/mails/${mailId}/in`,
      {},
      this.getRequestHeaders()
    );
  }

  deleteOut(mailId: string): Observable<any> {
    return this.http.put<Mail>(
      `/api/mails/${mailId}/out`,
      {},
      this.getRequestHeaders()
    );
  }

  sendMail(
    userId: string,
    mailTarget: string,
    subject: string,
    message: string
  ): Observable<any> {
    return this.http.post<Mail>(
      `/api/mails`,
      {
        userId,
        mailTarget,
        subject,
        message,
      },
      this.getRequestHeaders()
    );
  }
}
