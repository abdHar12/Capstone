import { Component, ElementRef, OnInit } from '@angular/core';
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
      this.products = el;
      el.forEach((e) => console.log(e));
    });
  }

  deleteFromCart(id: string) {
    this.cartSrv.deleteFromCart(id).subscribe(() => {
      this.products.forEach((el, index) => {
        if (el.UUID === id) this.products.splice(index, 1);
      });
    });
  }
}
