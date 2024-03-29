import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/module/cart-product';
import { CartService } from 'src/app/service/cart.service';
import { NavComponent } from '../nav/nav.component';
import { AuthData } from 'src/app/module/authdata';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavService } from 'src/app/service/nav.service';
import { Subject, debounceTime } from 'rxjs';
import { User } from 'src/app/module/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() products: CartProduct[] = [];
  @Input() auth!: string;

  private modalService = inject(NgbModal);

  constructor(
    private cartSrv: CartService,
    private router: Router,
    private navSrv: NavService
  ) {}
  ngOnInit(): void {}
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }
  openScrollableContent(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true });
  }
  dnoneDiv(divId: string, buttonId: string) {
    this.navSrv.dnoneDiv(divId, buttonId);
  }
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
}
