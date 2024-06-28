import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { User } from 'src/app/modules/users/resources/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getRequestHeaders(): any {
    const headers = this.authService.getHeaders();
    return headers ? { headers } : EMPTY;
  }

  getUser(_id: string, role: string): Observable<any> {
    return this.http.get<User>(
      `/api/users/${_id}/${role}`,
      this.getRequestHeaders()
    );
  }

  getUsers(role: string): Observable<any> {
    return this.http.get<any>(`/api/users/${role}`, this.getRequestHeaders());
  }

  // Customer
  updateUserTest(
    _id: string,
    test1: string,
    test2: string,
    test3: string,
    test4: string,
    test5: string
  ): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/test`,
      {
        test1,
        test2,
        test3,
        test4,
        test5,
      },
      this.getRequestHeaders()
    );
  }

  addToCart(
    _id: string,
    item: any,
    qty: number,
    warranty: string,
    gift: string,
    extra1: string,
    extra2: string
  ): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/buy`,
      {
        item,
        qty,
        warranty,
        gift,
        extra1,
        extra2,
      },
      this.getRequestHeaders()
    );
  }

  removeFromCart(_id: string, item: any): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/remove`,
      { item },
      this.getRequestHeaders()
    );
  }

  updateProfile(
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string
  ): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/profile`,
      {
        firstName,
        lastName,
        email,
        password,
        phone,
        purpose,
        birthday,
        gender,
      },
      this.getRequestHeaders()
    );
  }

  // Admin
  removeUser(userId: string): Observable<any> {
    return this.http.put<User>(
      `/api/users/${userId}/deleted`,
      {},
      this.getRequestHeaders()
    );
  }

  updateAdminUser(
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    purpose: string,
    birthday: string,
    gender: string,
    coupon: string,
    testScore: any,
    isManager: boolean,
    isSupport: boolean
  ): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/edit`,
      {
        firstName,
        lastName,
        email,
        phone,
        purpose,
        birthday,
        gender,
        coupon,
        testScore,
        isManager,
        isSupport,
      },
      this.getRequestHeaders()
    );
  }

  // Manager
  updateUserCoupon(_id: string, coupon: string): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/coupon`,
      {
        coupon,
      },
      this.getRequestHeaders()
    );
  }

  updateTestScore(_id: string, testScore: number): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/testscore`,
      {
        testScore,
      },
      this.getRequestHeaders()
    );
  }

  resetPassword(_id: string): Observable<any> {
    return this.http.put<User>(
      `/api/users/${_id}/resetpassword`,
      {},
      this.getRequestHeaders()
    );
  }
}
