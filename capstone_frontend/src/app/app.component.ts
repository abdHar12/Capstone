import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MangaService } from './service/manga.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'capstone_frontend';
  constructor(private authSrv: AuthService, private mangaSrv: MangaService) {
    this.authSrv.restore();
  }
}
