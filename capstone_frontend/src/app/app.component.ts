import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MangaService } from './service/manga.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'capstone_frontend';
  constructor(
    private authSrv: AuthService,
    private mangaSrv: MangaService,
    private cartSrv: CartService
  ) {
    this.authSrv.restore();
    this.cartSrv.products = [];
    cartSrv.getProductsInCart().subscribe((el) => (this.cartSrv.products = el));
  }
}
