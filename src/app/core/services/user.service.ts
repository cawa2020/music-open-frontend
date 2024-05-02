import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/playlist.interface';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Method } from '../../shared/interfaces/app.interface';
import { Album } from '../../shared/interfaces/album.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User | null = null
  public readonly userChanges: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private http: HttpClient) { }

  getUser(): User | null {
    return this.user
  }

  setUser(value: User | null) {
    this.user = value
    this.userChanges.next(Math.random())
  }

  fetchUserData(token: string) {
    return this._request('GET', `byToken/${token}`)
  }

  addToFavotiteAlbum(album: Album, token: string | undefined) {
    // ПРОВЕРКА НА ТОКЕН
    return this._request('POST', `album?token=${token}`, album)
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
