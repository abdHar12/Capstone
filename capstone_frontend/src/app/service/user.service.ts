import { Injectable } from '@angular/core';
import { User } from '../module/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}
}
