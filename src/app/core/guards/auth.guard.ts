import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from '../services/cookie.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService)
  const token = cookie.get('access_token')
  return !!token
};
