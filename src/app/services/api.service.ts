import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

type Method = 'POST' | 'GET'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAlbum(id: number) {
    return this._request('GET', 'album/' + id)
  }

  search(word: string): Observable<any> {
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

    return this.http.request(method, url, options)
  }

  // const url = '/search?q=%D0%BA%D0%B8%D1%88%D0%BB%D0%B0%D0%BA%20%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%BD%D0%BE';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': 'b08fdc8c61msh2548eee4724e202p134b42jsn6bb48b026b0e',
  //     }
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
}
