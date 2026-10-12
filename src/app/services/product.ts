import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all products from the backend
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new product
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData);
  }

  // Delete a product by its ID
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}