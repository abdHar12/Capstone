import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/module/cart-product';
import { CartService } from 'src/app/service/cart.service';
import { NavComponent } from '../nav/nav.component';
import { AuthData } from 'src/app/module/authdata';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() products: CartProduct[] = [];
  @Input() auth!: string;
  constructor(private cartSrv: CartService, private router: Router) {}
  ngOnInit(): void {}

  goToTheOrder() {
    this.router.navigateByUrl('/creation-order');
    let target = document.getElementById('cart-button') as HTMLButtonElement;
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
      (target as HTMLButtonElement)!.style.border = '2px solid black';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    cartDiv.style.display = 'none';
  }

  deleteFromCart(id: string) {
    this.cartSrv.deleteFromCart(id).subscribe(() => {
      this.products.forEach((el, index) => {
        if (el.UUID === id) this.products.splice(index, 1);
        window.location.reload();
      });
    });
  }
}
