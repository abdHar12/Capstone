import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {}
  logOut() {
    this.authSrv.logout();
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    cartDiv.style.display = 'none';
    let searchDiv = document.querySelector('#search-div') as HTMLDivElement;
    searchDiv.style.display = 'none';
  }
}
