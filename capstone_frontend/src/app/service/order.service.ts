import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../module/order';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../module/cart-product';
import { OrderPerUser } from '../module/order-per-user';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}
  sendOrder(data: {
    name: string | null;
    amount: string;
    paymentType: string | null;
    products: CartProduct[];
  }) {
    return this.http.post<Order>(`${this.apiUrl}/orders`, data);
  }

  getOrderPerUser() {
    return this.http.get<OrderPerUser[]>(`${this.apiUrl}/orders/user`);
  }

  getProductsOfOrder(id: string) {
    return this.http.get<CartProduct[]>(`${this.apiUrl}/products/order/${id}`);
  }
}
