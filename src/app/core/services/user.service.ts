import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { Method } from '../../shared/interfaces/app.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from '../../shared/interfaces/song.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { User } from '../../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User | null = null
  public readonly changes: ReplaySubject<number> = new ReplaySubject(1)

  constructor(private http: HttpClient) { }

  getUser(): User | null {
    return this.user
  }

  setUser(value: User | null) {
    this.user = value
    this.changes.next(Math.random())
  }

  fetchUserData(token: string) {
    return this._request('GET', `me/${token}`)
  }

  addToFavotiteAlbum(album: Album, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `album?token=${token}`, album)
  }

  addToFavotiteSong(song: Song, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `song?token=${token}`, song)
  }

  addToFavotiteArtist(artist: Artist, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `artist?token=${token}`, artist)
  }

  private _request(method: Method, path: string, body?: any): Observable<any> {
    const url = 'http://localhost:3000/user/' + path
    const options: any = {}

    if (body) {
      options.body = body
    }

    return this.http.request(method, url, options)
  }
}
