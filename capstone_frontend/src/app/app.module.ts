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
import { SingleMangaComponent } from './components/single-manga/single-manga.component';
import { MangaAllInfoComponent } from './components/manga-all-info/manga-all-info.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  {
    path: 'register-page',
    component: RegisterPageComponent,
  },
  { path: '', component: MainPageComponent },
  {
    path: 'manga-all-info',
    component: MangaAllInfoComponent,
  },
  {
    path: 'creation-order',
    component: OrderPageComponent,
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
    SingleMangaComponent,
    MangaAllInfoComponent,
    ChapterComponent,
    CartComponent,
    OrderPageComponent,
    FooterComponent,
    SearchComponent,
    UserInfoComponent,
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
