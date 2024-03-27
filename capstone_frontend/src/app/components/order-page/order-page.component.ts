import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/module/cart-product';
import { Order, PaymentType } from 'src/app/module/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, DoCheck {
  orderForm = this.fb.group({
    firstName: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    address: ['', [Validators.required]],
    typeOfPayment: ['', [Validators.required]],
  });
  products!: CartProduct[];
  totalAmount!: number;
  paymentType: typeof PaymentType = PaymentType;
  constructor(
    private fb: FormBuilder,
    private cartSrv: CartService,
    private orderSrv: OrderService,
    private router: Router
  ) {}
  ngDoCheck(): void {
    this.products = this.cartSrv.getProducts();
    this.totalAmount = this.products
      .map((product) => Number.parseFloat(product.price))
      .reduce((accumulator, number) => accumulator + number, 0);
  }

  ngOnInit(): void {
    this.products = this.cartSrv.getProducts();
    this.totalAmount = this.products
      .map((product) => Number.parseFloat(product.price))
      .reduce((accumulator, number) => accumulator + number, 0);
  }
  keys(): Array<string> {
    var keys = Object.keys(this.paymentType);
    return keys.slice(keys.length / 2);
  }
  onMakeTheOrder() {
    const data = {
      name:
        this.orderForm.controls['firstName'].value +
        ' ' +
        this.orderForm.controls['surname'].value,
      address: this.orderForm.controls['address'].value,
      paymentType: this.orderForm.controls['typeOfPayment'].value,
      amount: this.totalAmount.toString(),
      products: this.products,
    };
    console.log(data);
    this.orderSrv
      .sendOrder(data)
      .subscribe((el: any) => this.router.navigate(['/manga-all-info']));
  }

  changeTypeOfPayment(e: any) {
    this.orderForm.setValue(e.target.value, {
      onlySelf: true,
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
