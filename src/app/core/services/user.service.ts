import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { Method } from '../../shared/interfaces/app.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from '../../shared/interfaces/song.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { User } from '../../shared/interfaces/auth.interface';
import { ToastService } from './toast.service';
import { CookieService } from './cookie.service';
import { USER_ENDPOINT } from '../../shared/constants/links.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = signal<User | null>(null);

  constructor(private http: HttpClient, private toast: ToastService, private cookieService: CookieService) { }

  getUser(): User | null {
    return this.user();
  }

  setUser(value: User): void {
    this.user.set(value);
  }

  fetchUserData(token: string): Observable<User> {
    return this._request<User>('GET', `me/${token}`);
  }

  addToFavotiteAlbum(album: Album): Observable<User> {
    return this._request<User>('POST', `album`, album, true);
  }

  addToFavotiteSong(song: Song): Observable<User> {
    return this._request<User>('POST', `song`, song, true);
  }

  addToFavotiteArtist(artist: Artist): Observable<User> {
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

    return this.http.request<T>(method, url, options);
  }
}
