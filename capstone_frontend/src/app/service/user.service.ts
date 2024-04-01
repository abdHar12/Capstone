import { Injectable } from '@angular/core';
import { User } from '../module/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Form } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

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
  modifyUser(data: {
    username: string;
    firstName: string;
    surname: string;
    email: string;
  }) {
    return this.http
      .patch<User>(`${this.apiUrl}/users/profile`, data)
      .pipe(catchError(this.errors));
  }
  deleteProfile() {
    return this.http.delete(`${this.apiUrl}/users/profile`);
  }

  private errors(err: HttpErrorResponse) {
    console.log(err);
    alert(err.error.message);
    return throwError(err.error.message);
  }
}
