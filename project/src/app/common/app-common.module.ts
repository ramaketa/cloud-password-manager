import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {UtilsService} from './services/utils.service';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    ApiService,
    AuthService,
    AuthInterceptor,
    AuthGuard,
    UtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppCommonModule {}
