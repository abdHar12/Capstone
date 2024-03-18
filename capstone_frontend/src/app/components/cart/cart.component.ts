import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/module/cart-product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: CartProduct[] = [];
  constructor(private cartSrv: CartService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.cartSrv.getProductsByUser().subscribe((el) => {
      el.forEach((e) => {
        console.log(e);
      });
    });
  }
}
