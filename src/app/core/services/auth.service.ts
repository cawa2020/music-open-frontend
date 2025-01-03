import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { Method } from '../../shared/interfaces/app.interface';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Error, Login, Registration, Token } from '../../shared/interfaces/auth.interface';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

const AUTH_API_ENDPOINT = 'http://localhost:3000/auth/'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth = signal<boolean | null>(null)

  constructor(private route: Router, private http: HttpClient, private cookie: CookieService) { }

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
}
