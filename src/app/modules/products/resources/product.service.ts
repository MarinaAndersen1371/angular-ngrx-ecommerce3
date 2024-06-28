import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/modules/users/resources/auth.service';
import { Product } from 'src/app/modules/products/resources/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getRequestHeaders(): any {
    const headers = this.authService.getHeaders();
    return headers ? { headers } : EMPTY;
  }

  getProducts(): Observable<any> {
    return this.http.get('/api/products');
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  getAdminProduct(id: string, role: string): Observable<any> {
    return this.http.get<Product>(
      `/api/products/${id}/${role}`,
      this.getRequestHeaders()
    );
  }

  getAdminProducts(role: string): Observable<any> {
    return this.http.get(`/api/products/${role}`, this.getRequestHeaders());
  }

  reviewProduct(
    id: string,
    userName: string,
    userId: string,
    rating: number,
    comment: string
  ): Observable<any> {
    return this.http.post<Product>(
      `/api/products/${id}/reviews`,
      {
        userName,
        userId,
        rating,
        comment,
      },
      this.getRequestHeaders()
    );
  }

  removeProduct(productId: string, role: string): Observable<any> {
    return this.http.put<Product>(
      `/api/products/${productId}/deleted/${role}`,
      {},
      this.getRequestHeaders()
    );
  }

  createProduct(
    name: string,
    brand: string,
    category: string,
    description: string,
    pricePurchase: number,
    price: number,
    quantity: number,
    extra: boolean,
    imageUrl: string,
    modifiedBy: string
  ): Observable<any> {
    return this.http.post<Product>(
      `/api/products/${modifiedBy}`,
      {
        name,
        brand,
        category,
        description,
        pricePurchase,
        price,
        quantity,
        extra,
        imageUrl,
        modifiedBy,
      },
      this.getRequestHeaders()
    );
  }

  updateProduct(
    id: string,
    name: string,
    brand: string,
    category: string,
    description: string,
    pricePurchase: number,
    price: number,
    quantity: number,
    extra: boolean,
    imageUrl: string,
    modifiedBy: string
  ): Observable<any> {
    return this.http.put<Product>(
      `/api/products/${id}/${modifiedBy}`,
      {
        name,
        brand,
        category,
        description,
        pricePurchase,
        price,
        quantity,
        extra,
        imageUrl,
        modifiedBy,
      },
      this.getRequestHeaders()
    );
  }
}
