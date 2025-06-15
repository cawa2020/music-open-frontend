import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album, AlbumBrief, Genres } from '../../shared/interfaces/album.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { CreatePlaylist, Playlist } from '../../shared/interfaces/playlist.interface';
import { Method } from '../../shared/interfaces/app.interface';
import { Song, SongBrief } from '../../shared/interfaces/song.interface';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cookieService = inject(CookieService)
  private http = inject(HttpClient)

  private token = this.cookieService.get('access_token')

  getArtist(id: number): Observable<Artist> {
    return this._request('GET', 'artist/' + id);
  }

  getArtistTop(
    id: number,
    limit?: number,
    index?: number
  ): Observable<{ data: Song[]; total: number }> {
    let url = `artist/${id}/top?`;
    if (limit) url += 'limit=' + limit;
    if (index) url += '&index=' + index;
    return this._requestPrivateAPI('GET', url);
  }

  getArtistAlbums(
    id: number,
    limit?: number,
    index?: number
  ): Observable<{ data: AlbumBrief[] }> {
    let url = `artist/${id}/albums`;
    if (limit) {
      url += '?limit=' + limit;
    }
    if (index) {
      url += '?index=' + index;
    }
    return this._requestPrivateAPI('GET', url);
  }

  getArtistRelated(id: number, limit?: number): Observable<{ data: Artist[] }> {
    let url = `artist/${id}/related`;
    if (limit) {
      url += '?limit=' + limit;
    }
    return this._requestPrivateAPI('GET', url);
  }

  getPlaylistsWithArtist(id: number): Observable<{ data: Playlist[] }> {
    return this._requestPrivateAPI('GET', `artist/${id}/playlists`);
  }

  getAlbum(id: number): Observable<Album> {
    return this._request('GET', 'album/' + id);
  }

  getAlbumTracks(id: number): Observable<{ data: SongBrief[] }> {
    return this._requestPrivateAPI('GET', 'album/' + id + '/tracks');
  }

  getSong(id: number): Observable<Song> {
    return this._request('GET', 'track/' + id);
  }

  getBySearch(word: string): Observable<any> {
    const path = `search?q=${word}`;
    return this._request('GET', path);
  }

  getByArtistSearch(word: string): Observable<any> {
    const path = `search?q=artist:${word}`;
    return this._request('GET', path);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this._requestLocal('GET', 'playlist/' + id);
  }

  createPlaylist(body: CreatePlaylist): Observable<Playlist> {
    const url = `playlist?token=${this.token}`;
    return this._requestLocal('POST', url, body);
  }

  toggleSongOnPlaylist(body: Song, id: number) {
    const url = `playlist/${id}/songs?token=${this.token}`;
    return this._requestLocal('PATCH', url, body);
  }

  updatePlaylist(id: string, body: Playlist) {
    const url = `playlist/${id}?token=${this.token}`;
    return this._requestLocal('PUT', url, body);
  }

  deletePlaylist(id: string) {
    const url = `playlist/${id}?token=${this.token}`;
    return this._requestLocal('DELETE', url);
  }

  getGenre(id: string): Observable<Genres> {
    return this._requestPrivateAPI('GET', 'genre/' + id);
  }

  getGenreArtists(id: string): Observable<{ data: Artist[] }> {
    return this._requestPrivateAPI('GET', `genre/${id}/artists`);
  }

  private _request(method: Method, path: string, body?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set(
      'X-RapidAPI-Key',
      'b08fdc8c61msh2548eee4724e202p134b42jsn6bb48b026b0e'
    );
    headers = headers.set(
      'X-RapidAPI-Host',
      'deezerdevs-deezer.p.rapidapi.com'
    );

    const options = {
      headers: headers,
      body: body,
    };

    const url = 'https://deezerdevs-deezer.p.rapidapi.com/' + path;

    return this.http.request(method, url, options);
  }

  private _requestPrivateAPI(
    method: Method,
    path: string,
    body?: unknown
  ): Observable<any> {
    // const url =
    //   `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/` + path;
    const url = `https://corsproxy.io/?https://api.deezer.com/` + path;

    return this.http.request(method, url);
  }

  private _requestLocal(
    method: Method,
    path: string,
    body?: any
  ): Observable<any> {
    let headers = new HttpHeaders();
    const url = `https://music-open-back.u-hu.site/` + path;

    const options = {
      headers: headers,
      body: body,
    };

    return this.http.request(method, url, options);
  }
}
