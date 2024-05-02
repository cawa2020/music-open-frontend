import { Injectable, OnInit } from '@angular/core';
import { Method } from '../../shared/interfaces/app.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Error, Login, Registration, Token } from '../../shared/interfaces/auth.interface';
import { CookieService } from './cookie.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private http: HttpClient, private cookie: CookieService) { }

  registration(body: Registration): Observable<Token | Error> {
    return this._request('POST', 'registration', body)
  }

  login(body: Login): Observable<Token | Error> {
    return this._request('POST', 'login', body)
  }

  logout() {
    this.cookie.delete('access_token')
    location.reload()
  }

  private _request(method: Method, path: string, body?: any, token?: string): Observable<any> {
    const url = 'http://localhost:3000/auth/' + path
    const options: any = {}

    if (body) {
      options.body = body
    }

    if (token) {
      options.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }

    return this.http.request(method, url, options)
  }
}
