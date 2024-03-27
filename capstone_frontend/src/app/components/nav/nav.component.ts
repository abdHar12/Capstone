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
import { User } from 'src/app/module/user';
import { CartService } from 'src/app/service/cart.service';
import { NavService } from 'src/app/service/nav.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, DoCheck {
  currentRoute!: string;
  prevRoute!: string;
  products: CartProduct[] = [];
  auth!: string;
  currentUser!: User;
  constructor(
    private router: Router,
    private authSrv: AuthService,
    private cartSrv: CartService,
    private navSrv: NavService,
    private usrSrv: UserService
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

  dnoneDiv(divId: string, buttonId: string) {
    this.navSrv.dnoneDiv(divId, buttonId);
  }
  getCurrentUser() {
    this.usrSrv.getCurrentUser().subscribe((el) => {
      this.currentUser = el;
      console.log(this.currentUser);
    });
  }
  getProducts() {
    this.auth = localStorage.getItem('user')!;
    if (this.auth) {
      this.cartSrv.getProductsInCart().subscribe((el) => {
        this.products = el;
        this.cartSrv.products = el;
        el.forEach((e) => console.log(e));
      });
    }
  }
  styleOfButton(target: EventTarget | null, divId: string): void {
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
      (target as HTMLButtonElement)!.style.border = '2px solid black';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let div = document.getElementById(divId) as HTMLDivElement;
    if (div.id === 'cart-div') {
      document.getElementById('search-div')!.style.display = 'none';
      document.getElementById('search-button')!.style.backgroundColor = 'white';
      document.getElementById('search-button')!.style.color = 'black';
      document.getElementById('user-div')!.style.display = 'none';
      document.getElementById('user-button')!.style.backgroundColor = 'white';
      document.getElementById('user-button')!.style.color = 'black';
    } else if (div.id === 'search-div') {
      document.getElementById('cart-div')!.style.display = 'none';
      document.getElementById('cart-button')!.style.backgroundColor = 'white';
      document.getElementById('cart-button')!.style.color = 'black';
      document.getElementById('user-div')!.style.display = 'none';
      document.getElementById('user-button')!.style.backgroundColor = 'white';
      document.getElementById('user-button')!.style.color = 'black';
    } else {
      document.getElementById('cart-div')!.style.display = 'none';
      document.getElementById('cart-button')!.style.backgroundColor = 'white';
      document.getElementById('cart-button')!.style.color = 'black';
      document.getElementById('search-div')!.style.display = 'none';
      document.getElementById('search-button')!.style.backgroundColor = 'white';
      document.getElementById('search-button')!.style.color = 'black';
    }
    div.style.display === 'none'
      ? (div.style.display = 'block')
      : (div.style.display = 'none');
    let nav = document.querySelector('#nav-bar') as HTMLElement;
    div.style.setProperty('top', nav.offsetHeight.toString());
    div.style.setProperty('width', nav.offsetWidth.toString() + 'px');
  }

  @HostListener('window:resize', ['$event'])
  onResize(even: any) {
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    let searchDiv = document.querySelector('#search-div') as HTMLDivElement;
    let userDiv = document.querySelector('#user-div') as HTMLDivElement;
    let nav = document.querySelector('#nav-bar') as HTMLElement;
    cartDiv.style.setProperty('top', nav.offsetHeight.toString());
    cartDiv.style.setProperty('width', nav.offsetWidth.toString() + 'px');
    searchDiv.style.setProperty('top', nav.offsetHeight.toString());
    searchDiv.style.setProperty('width', nav.offsetWidth.toString() + 'px');
    userDiv.style.setProperty('top', nav.offsetHeight.toString());
    userDiv.style.setProperty('width', nav.offsetWidth.toString() + 'px');
  }
}
