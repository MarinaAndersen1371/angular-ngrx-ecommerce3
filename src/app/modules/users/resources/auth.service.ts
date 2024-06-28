import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/users/resources/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient, private route: Router) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/users/login', { email, password }).pipe(
      tap((user) => {
        if (user && user.token) {
          this.setUser(user);
        }
      })
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string
  ): Observable<User> {
    return this.http
      .post<User>('/api/users', {
        firstName,
        lastName,
        email,
        password,
        phone,
        purpose,
        birthday,
        gender,
      })
      .pipe(
        tap((user) => {
          if (user && user.token) {
            this.setUser(user);
          }
        })
      );
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const storedUserData = localStorage.getItem(this.USER_KEY);
    return storedUserData ? JSON.parse(storedUserData) : null;
  }

  getToken(): string | null {
    const storedUserData = localStorage.getItem(this.USER_KEY);
    const user: User | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    return user && user.token ? user.token : null;
  }

  getHeaders(): HttpHeaders | null {
    const token = this.getToken();
    if (!token) {
      this.route.navigate(['/not-authorized']);
      return null;
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('cart'), localStorage.removeItem('subscription');
  }
}
