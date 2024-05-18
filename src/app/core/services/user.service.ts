import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { Method } from '../../shared/interfaces/app.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from '../../shared/interfaces/song.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { User } from '../../shared/interfaces/auth.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;
  public readonly changes: ReplaySubject<number> = new ReplaySubject(1);

  constructor(private http: HttpClient, private toast: ToastService) {}

  getUser(): User | null {
    return this.user;
  }

  setUser(value: User | null) {
    this.user = value;
    this.changes.next(Math.random());
  }

  fetchUserData(token: string) {
    return this._request('GET', `me/${token}`);
  }

  addToFavotiteAlbum(album: Album, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `album`, album, token ?? 'NO_TOKEN');
  }

  addToFavotiteSong(
    song: Song,
    token: string | undefined
  ): Observable<null | User> {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `song`, song, token ?? 'NO_TOKEN');
  }

  addToFavotiteArtist(artist: Artist, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `artist`, artist, token ?? 'NO_TOKEN');
  }

  private _request(
    method: Method,
    path: string,
    body?: any,
    token?: string
  ): Observable<any> {
    let url = 'http://localhost:3000/user/' + path;

    if (token === 'NO_TOKEN') {
      this.toast.info('Войдите в аккаунт для действия');
      return of(null);
    } else if (token) {
      url += `?token=${token}`;
    }

    const options: any = {};

    if (body) {
      options.body = body;
    }

    return this.http.request(method, url, options);
  }
}
