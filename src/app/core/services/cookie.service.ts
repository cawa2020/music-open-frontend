import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {}

  get(key: string): string|undefined {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  set(key: string, value: string, options: any = {}): void {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000*36000*4*365*3;
    now.setTime(expireTime);

    options = { path: '/', ...options, expires: now.toUTCString() };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

    for (const optionKey of Object.keys(options)) {
        updatedCookie += '; ' + optionKey;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
  }

  delete(key: string): void {
    this.set(key, '', { 'max-age': -1 });
  }
}
