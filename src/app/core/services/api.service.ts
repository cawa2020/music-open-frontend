import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlbumBrief } from '../../shared/interfaces/album.interface';
import { Artist } from '../../shared/interfaces/artist.interface';
import { Playlist } from '../../shared/interfaces/playlist.interface';
import { Method } from '../../shared/interfaces/app.interface';
import { Song, SongBrief } from '../../shared/interfaces/song.interface';
import { LOCAL_API_ENDPOINT } from '../../shared/constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

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

  getAlbum(id: number) {
    return this._request('GET', 'album/' + id);
  }

  getAlbumTracks(id: number): Observable<{ data: SongBrief[] }> {
    return this._requestPrivateAPI('GET', 'album/' + id + '/tracks');
  }

  getBySearch(word: string): Observable<any> {
    const path = 'search?q=' + word;
    return this._request('GET', path);
  }

  getSong(songId: number): Observable<Song> {
    return this._request('GET', `track/${songId}`)
  }

  getPlaylist(id: number) {
    return this._requestLocal('GET', 'playlist/' + id);
  }

  createPlaylist(token: string | undefined, body: Playlist) {
    const url = `playlist/?token=${token}`;
    return this._requestLocal('POST', url, body);
  }

  updatePlaylist(token: string | undefined, id: string, body: Playlist) {
    const url = `playlist/${id}?token=${token}`;
    return this._requestLocal('PUT', url, body);
  }

  deletePlaylist(token: string | undefined, id: string) {
    const url = `playlist/${id}?token=${token}`;
    return this._requestLocal('DELETE', url);
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
    body?: any
  ): Observable<any> {
    const url =
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/` + path;
    // const url = `https://corsproxy.io/?https://api.deezer.com/` + path;

    return this.http.request(method, url);
  }

  private _requestLocal(
    method: Method,
    path: string,
    body?: any
  ): Observable<any> {
    const url = LOCAL_API_ENDPOINT + path;

    return this.http.request(method, url);
  }
}
