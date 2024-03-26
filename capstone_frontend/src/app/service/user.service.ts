import { Injectable } from '@angular/core';
import { User } from '../module/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getCurrentUser() {
    this.http.get(`${this.apiUrl}/profile`);
  }

  logOut() {
    this.authSrv.logout();
  }
}
