import {
  AfterViewChecked,
  Component,
  DoCheck,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  Event,
} from '@angular/router';
import { ngbPositioning } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { AuthService } from 'src/app/auth/auth.service';
import { CartProduct } from 'src/app/module/cart-product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, DoCheck {
  currentRoute!: string;
  prevRoute!: string;
  products: CartProduct[] = [];
  constructor(
    private router: Router,
    private authSrv: AuthService,
    private cartSrv: CartService
  ) {}
  ngDoCheck(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.prevRoute = this.currentRoute;
        console.log('Route change detected');
        this.currentRoute = event.url;
      }

      if (event instanceof NavigationEnd) {
        console.log(this.currentRoute);
        console.log(event);
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.authSrv.logout();
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    cartDiv.style.display = 'none';
  }
  getProducts() {
    this.cartSrv.getProductsInCart().subscribe((el) => {
      this.products = el;
      this.cartSrv.products = el;
      el.forEach((e) => console.log(e));
    });
  }
  styleOfButton(target: EventTarget | null): void {
    this.getProducts();
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
      (target as HTMLButtonElement)!.style.border = '2px solid black';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    cartDiv.style.display === 'none'
      ? (cartDiv.style.display = 'block')
      : (cartDiv.style.display = 'none');
    let nav = document.querySelector('#nav-bar') as HTMLElement;
    cartDiv.style.setProperty('top', nav.offsetHeight.toString());
    cartDiv.style.setProperty('width', nav.offsetWidth.toString() + 'px');
  }
  @HostListener('window:resize', ['$event'])
  onResize(even: any) {
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    let nav = document.querySelector('#nav-bar') as HTMLElement;
    cartDiv.style.setProperty('top', nav.offsetHeight.toString());
    cartDiv.style.setProperty('width', nav.offsetWidth.toString() + 'px');
  }
  dnoneCart() {
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
}
