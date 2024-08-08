import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, catchError, of, throwError } from 'rxjs';
import { Method } from '../../shared/interfaces/app.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Song } from '../../shared/interfaces/song.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { User } from '../../shared/interfaces/auth.interface';
import { ToastService } from './toast.service';
import { CookieService } from './cookie.service';
import { USER_ENDPOINT } from '../../shared/constants/links.constant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient, private auth: AuthService, private toast: ToastService, private cookieService: CookieService) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      // СДЕЛАТЬ ПЕРЕТАДЖИЧКИ !!!!
      this.auth.logout()
    }

    this.setUser(null)
    return of(null);
  }

  getUser(): User | null | undefined {
    return this.userSubject.value;
  }

  setUser(value: User | null): void {
    this.userSubject.next(value);
  }

  fetchUserData(token: string): Observable<User | null> {
    return this._request<User>('GET', `me/${token}`);
  }

  addToFavotiteAlbum(album: Album): Observable<User | null> {
    return this._request<User>('POST', `album`, album, true);
  }

  addToFavotiteSong(song: Song): Observable<User | null> {
    return this._request<User>('POST', `song`, song, true);
  }

  addToFavotiteArtist(artist: Artist): Observable<User | null> {
    return this._request<User>('POST', `artist`, artist, true);
  }

  private _request<T>(
    method: Method,
    path: string,
    body?: unknown,
    isRequestWithToken?: boolean
  ): Observable<T | null> {
    const url = USER_ENDPOINT + path;
    const token = this.cookieService.get('access_token') ?? (isRequestWithToken ? 'NO_TOKEN' : null)

    if (token === 'NO_TOKEN') {
      this.toast.info('Войдите в аккаунт для действия');
      throw new Error('no token')
    }

    let headers = new HttpHeaders()
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }

    const options = {
      body: body,
      headers: headers
    };

    return this.http.request<T>(method, url, options).pipe(catchError(x => this.handleAuthError(x)));
  }
}
