import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../module/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}
  addArticleToCart(data: {
    titleManga: string;
    chapterTitle: string;
    chapterNumber: string;
    price: string;
    imgManga: string;
  }) {
    return this.http.post<CartProduct>(`${this.apiUrl}/products`, data);
  }
  getProductsByUser() {
    return this.http.get<CartProduct[]>(`${this.apiUrl}/products/cart`);
  }
  deleteFromCart(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
  verifyExistence(titleManga: string, chapterNumber: string) {
    return this.http.get<CartProduct[]>(
      `${this.apiUrl}/products/verify-existence?titleManga=${titleManga}&chapterNumber=${chapterNumber}`
    );
  }
}
