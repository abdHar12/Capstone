import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartProduct } from 'src/app/module/cart-product';
import { OrderPerUser } from 'src/app/module/order-per-user';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss'],
})
export class SingleOrderComponent implements OnInit {
  private modalService = inject(NgbModal);

  @Input() order!: OrderPerUser;
  products!: CartProduct[];

  constructor(private orderSrv: OrderService) {}

  ngOnInit(): void {}
  setProducts() {
    this.orderSrv.getProductsOfOrder(this.order.id).subscribe((el) => {
      this.products = el;
      console.log(this.products);
    });
  }
  openScrollableContent(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }
}
