import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavComponent } from './components/nav/nav.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { CommonModule } from '@angular/common';
import { SingleAnimeComponent } from './components/single-anime/single-anime.component';
import { FastAverageColor } from 'fast-average-color';
import { MangaAllInfoComponent } from './components/manga-all-info/manga-all-info.component';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  {
    path: 'register-page',
    component: RegisterPageComponent,
  },
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  {
    path: 'manga-all-info',
    component: MangaAllInfoComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavComponent,
    MainPageComponent,
    RegisterPageComponent,
    SingleAnimeComponent,
    MangaAllInfoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
