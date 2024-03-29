import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/module/cart-product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  @Input() product!: CartProduct;
  @Input() products: CartProduct[] = [];
  @Input() productInCart: boolean = false;

  constructor(private cartSrv: CartService) {}

  ngOnInit(): void {}

  deleteFromCart(id: string) {
    this.cartSrv.deleteFromCart(id).subscribe(() => {
      this.products.forEach((el, index) => {
        if (el.UUID === id) this.products.splice(index, 1);
      });
    });
  }
}
