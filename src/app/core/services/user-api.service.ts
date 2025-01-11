import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { USER_ENDPOINT } from '../../shared/constants/links.constant';
import { Album } from '../../shared/interfaces/album.interface';
import { Method } from '../../shared/interfaces/app.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { User } from '../../shared/interfaces/auth.interface';
import { Song } from '../../shared/interfaces/song.interface';
import { CookieService } from './cookie.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private cookieService: CookieService, private toast: ToastService, private http: HttpClient, private auth: AuthService, private userService: UserService) { }

  fetchUser(userId: string): Observable<User | null> {
    return this._request<User>('GET', userId);
  }

  fetchUserDataByToken(): Observable<User | null> {
    const token = this.cookieService.get('access_token')
    if (!token) return of(null)
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
  ): Observable<T> {
    const url = USER_ENDPOINT + path;
    const token = this.cookieService.get('access_token') ?? (isRequestWithToken ? 'NO_TOKEN' : null)

    if (token === 'NO_TOKEN') {
      this.auth.showInfoAboutLogging()
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

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      // СДЕЛАТЬ ПЕРЕТАДЖИЧКИ !!!!
      this.auth.logout()
    }

    this.auth.setIsAuth(false)
    return of(null);
  }
}
