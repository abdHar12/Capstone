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
    return this.http.get<User>(`${this.apiUrl}/users/profile`);
  }

  logOut() {
    this.authSrv.logout();
  }

  uploadAvatar(data: FormData) {
    return this.http.patch<User>(`${this.apiUrl}/users/profile/upload`, data);
  }
}
