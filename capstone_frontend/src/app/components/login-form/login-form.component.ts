import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  private modalService = inject(NgbModal);

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private navSrv: NavService
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    console.log(form);
    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log(data);
    try {
      this.authSrv.login(data).subscribe(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
    this.navSrv.dnoneDiv('cart-div', 'cart-button');
    this.navSrv.dnoneDiv('user-div', 'user-button');
  }

  openScrollableContent(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
