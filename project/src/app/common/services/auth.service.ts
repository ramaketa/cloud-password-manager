import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable, of} from 'rxjs';
import {UtilsService} from './utils.service';
import {ApiLoginResponse} from "../models/api-login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  private urlBeforeLogin: string = ''; // Адрес страницы на которую пытался войти человек до авторизации

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    ) {
    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken !== null) {
      this.setToken(localStorageToken);
    }
  }

  login(user: User): Observable<ApiLoginResponse> {
    return this.http.post<ApiLoginResponse>('/api/auth/login', user);
  }

  setToken(token: any): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token && !this.jwtHelperService.isTokenExpired(this.token);
  }

  getUserInfo(): any {
    if (this.token) {
      return this.jwtHelperService.decodeToken(this.token).user;
    }
  }

  existRole(role: any): boolean {
    return this.jwtHelperService.decodeToken(this.token).user.role.includes(role);
  }

  logout(): void {
    this.setToken(null);
    this.utilsService.defaultMessage('Уведомление', 'Успешно вышли из системы');
    localStorage.removeItem('token');
    window.location.href = '/login?logout=true';
  }

  /**
   * Получение страницы куда пытался войти человек до авторизаци
   */
  getUrlBeforeLogin(): string {
    return this.urlBeforeLogin;
  }

  /**
   * Установка страницы куда пытался войти человек до авторизаци
   * @param value адрес страницы
   */
  setUrlBeforeLogin(value: string): void {
    this.urlBeforeLogin = value;
  }
}
