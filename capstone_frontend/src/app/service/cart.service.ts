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
}
