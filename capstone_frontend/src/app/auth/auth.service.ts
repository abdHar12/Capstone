import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthData } from '../module/authdata';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.authURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/login`, data).pipe(
      tap((loggato) => {
        this.authSubj.next(loggato);
        this.utente = loggato;
        localStorage.setItem('user', JSON.stringify(loggato));
        console.log(this.user$);
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      localStorage.removeItem('user');
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      localStorage.removeItem('user');
      return;
    }
    this.authSubj.next(userData);
  }
  register(data: {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiURL}/register`, data).pipe(
      tap(() => {
        alert('Registrazione effettuata');
        window.location.reload();
      }),
      catchError(this.errors)
    );
  }
  getAllUsers() {
    return this.http.get<AuthData[]>(`${this.apiURL}/users`);
  }
  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    window.location.reload();
  }

  private errors(err: HttpErrorResponse) {
    console.log(err);
    alert(err.error.message);
    return throwError(err.error.message);

    // switch (err.error) {
    //   case 'Email already exists':
    //     return throwError('Email già registrata');
    //     break;

    //   case 'Email format is invalid':
    //     return throwError('Formato mail non valido');
    //     break;

    //   case 'Cannot find user':
    //     return throwError('Utente inesistente');
    //     break;

    //   default:
    //     return throwError('Errore nella chiamata');
    //     break;
    // }
  }
}
