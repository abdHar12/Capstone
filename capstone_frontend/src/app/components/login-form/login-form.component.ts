import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  private modalService = inject(NgbModal);
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlertSuccess', { static: false })
  selfClosingAlertSuccess!: NgbAlert;
  successMessage = '';

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private navSrv: NavService
  ) {}

  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlertSuccess) {
        this.selfClosingAlertSuccess.close();
        this.modalService.dismissAll();
      }
    });
  }

  onLogin(form: NgForm) {
    console.log(form);
    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    this.navSrv.dnoneDiv('cart-div', 'cart-button');
    this.navSrv.dnoneDiv('user-div', 'user-button');
    console.log(data);
    try {
      this.authSrv.login(data).subscribe(() => {
        this._success.next('Login succeded');
      });
    } catch (error) {
      console.log(error);
    }
  }

  openScrollableContent(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
