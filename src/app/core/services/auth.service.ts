import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login, Registration, Token } from '../../shared/interfaces/auth.interface';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

const AUTH_API_ENDPOINT = 'https://music-open-backend-production.up.railway.app/auth/'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = signal<boolean | null>(null)

  constructor(private route: Router, private http: HttpClient, private cookie: CookieService, private toast: ToastService) { }

  getIsAuth(): Signal<boolean | null> {
    return this.isAuth
  }

  setIsAuth(value: boolean): void {
    this.isAuth.set(value)
  }

  registration(body: Registration): Observable<Token> {
    return this.http.post<Token>(AUTH_API_ENDPOINT + 'registration', body)
  }

  login(body: Login): Observable<Token> {
    return this.http.post<Token>(AUTH_API_ENDPOINT + 'login', body)
  }

  logout(): void {
    this.cookie.delete('access_token')
    this.route.navigate(['/home'])
    location.reload()
  }

  showInfoAboutLogging() {
    this.toast.info('Войдите в аккаунт для действия');
  }
}
