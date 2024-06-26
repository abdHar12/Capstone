import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavComponent } from './components/nav/nav.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { CommonModule } from '@angular/common';
import { SingleMangaComponent } from './components/single-manga/single-manga.component';
import { MangaAllInfoComponent } from './components/manga-all-info/manga-all-info.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ToastrModule } from 'ngx-toastr';
import Swiper from 'swiper';
import { SingleOrderComponent } from './components/single-order/single-order.component';
import { SingleProductComponent } from './components/single-product/single-product.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'manga-all-info',
    component: MangaAllInfoComponent,
  },
  {
    path: 'creation-order',
    component: OrderFormComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavComponent,
    MainPageComponent,
    RegisterFormComponent,
    SingleMangaComponent,
    MangaAllInfoComponent,
    ChapterComponent,
    CartComponent,
    OrderFormComponent,
    FooterComponent,
    SearchComponent,
    UserInfoComponent,
    SingleOrderComponent,
    SingleProductComponent,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
