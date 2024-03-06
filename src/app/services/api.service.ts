import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Track } from '../interfaces/app.interface';

type Method = 'POST' | 'GET'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPlaylist(id: number) {
    return this._request('GET', 'playlist/' + id)
  }

  getAtrist(id: number) {
    return this._request('GET', 'artist/' + id)
  }

  getArtistTop(id: number): Observable<{ data: Track[] }> {
    return this._requestAPI('GET', `artist/${id}/top?limit=50`)
  }

  getAlbum(id: number) {
    return this._request('GET', 'album/' + id)
  }

  getBySearch(word: string): Observable<any> {
    const path = 'search?q=' + word
    return this._request('GET', path)
  }

  private _request(method: Method, path: string, body?: any): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set('X-RapidAPI-Key', 'b08fdc8c61msh2548eee4724e202p134b42jsn6bb48b026b0e')
    headers = headers.set('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com')

    const options = {
      headers: headers
    }

    const url = 'https://deezerdevs-deezer.p.rapidapi.com/' + path

    7
    return this.http.request(method, url, options)
  }

  private _requestAPI(method: Method, path: string, body?: any): Observable<any> {
    const url = "https://api.deezer.com/" + path

    return this.http.request(method, url)
  }
}
