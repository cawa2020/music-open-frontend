import { Injectable, OnInit } from '@angular/core';
import { Method } from '../../shared/interfaces/app.interface';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Error, Login, Registration, Token } from '../../shared/interfaces/auth.interface';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { LOCAL_API_ENDPOINT } from '../../shared/constants/app.constant';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router, private http: HttpClient, private cookie: CookieService) { }

  registration(body: Registration): Observable<Token> {
    return this.http.post<Token>(LOCAL_API_ENDPOINT + 'registration', body)
  }

  login(body: Login): Observable<Token> {
    return this.http.post<Token>(LOCAL_API_ENDPOINT + 'login', body)
  }

  logout(): void {
    this.cookie.delete('access_token')
    this.route.navigate(['/home'])
    location.reload()
  }
}
